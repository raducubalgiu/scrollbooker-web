import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions, User } from "next-auth";
import { LOG } from "@/utils/logger";
import { SECOND } from "@/utils/date-utils";
import { JWT } from "next-auth/jwt";
import {
  fetchUserInfo,
  fetchUserPermissions,
  loginWithCredentials,
  refreshAccessToken,
  signInWithGoogle,
  verifyAccessToken,
} from "@/controllers/auth/auth.service";

const THIRTY_DAYS = 30 * 24 * 60 * 60;

// Trei id-uri de provider Google distincte (nu unul singur) pentru că cele
// trei pagini au semantici diferite și signIn() de mai jos nu are acces la
// pagina care a declanșat fluxul OAuth, doar la account.provider:
// - register-business: cont nou → role_name "business" obligatoriu, și
//   respingem dacă userul există deja cu alt rol decât "business".
// - register: cont nou → role_name "client" obligatoriu, și respingem dacă
//   userul există deja cu alt rol decât "client" (simetric cu business).
// - signin: niciun role_name (un user nou ar trebui să dea 400 pe backend,
//   "role_name is required for new account registration" — intenționat,
//   pagina de login nu creează conturi), niciun filtru de rol — orice cont
//   existent poate intra.
// Necesită TOATE cele 3 redirect URI înregistrate în Google Cloud Console:
// /api/auth/callback/google-business, /api/auth/callback/google-register și
// /api/auth/callback/google-signin (pot folosi același client id/secret,
// Google nu are nevoie de provideri separați, doar NextAuth îi diferențiază
// după acest id).
const REGISTER_BUSINESS_PATH = "/auth/register-business";
const REGISTER_PATH = "/auth/register";
const LOGIN_PATH = "/auth/signin";

function buildGoogleProfile(profile: {
  sub: string;
  name: string;
  email: string;
}) {
  // Câmpurile de auth (accessToken/refreshToken/accessTokenExpires) sunt
  // placeholder aici — signIn() de mai jos le suprascrie cu tokenurile
  // noastre (nu ale Google) înainte ca jwt() să le citească.
  return {
    id: profile.sub,
    name: profile.name,
    email: profile.email,
    username: profile.email,
    accessToken: "",
    refreshToken: "",
    accessTokenExpires: 0,
  };
}

async function buildRefreshedJwt(refreshToken: string): Promise<JWT> {
  const refreshed = await refreshAccessToken(refreshToken);

  const decoded = await verifyAccessToken(refreshed.access_token);
  if (!decoded?.exp) throw new Error("Invalid refreshed token");

  const [permissions, userInfo] = await Promise.all([
    fetchUserPermissions(refreshed.access_token),
    fetchUserInfo(refreshed.access_token),
  ]);

  return {
    accessToken: refreshed.access_token,
    refreshToken: refreshed.refresh_token,
    accessTokenExpires: decoded.exp * 1000,
    user_id: userInfo.id,
    username: userInfo.username,
    profession: userInfo.profession,
    is_validated: userInfo.is_validated,
    registration_step: userInfo.registration_step,
    permissions: permissions,
    avatar: userInfo.avatar,
    business_id: userInfo.business_id,
    business_owner_id: userInfo.business_owner_id,
    business_type_id: userInfo.business_type_id,
    has_employees: userInfo.has_employees,
    is_employee: userInfo.is_employee,
  };
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined,
        _req
      ): Promise<User | null> {
        const { username, password } = credentials || {};

        if (!username || !password) return null;

        const auth = await loginWithCredentials(username, password);
        if (!auth) return null;

        const decoded = await verifyAccessToken(auth.access_token);
        if (!decoded) return null;

        const user: User = {
          id: String(decoded.id),
          name: decoded.fullname,
          email: decoded.email,

          username: decoded.sub,
          accessToken: auth.access_token,
          refreshToken: auth.refresh_token,
          accessTokenExpires: decoded.exp * 1000,
        };

        return user;
      },
    }),
    GoogleProvider({
      id: "google-business",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile: buildGoogleProfile,
    }),
    GoogleProvider({
      id: "google-register",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile: buildGoogleProfile,
    }),
    GoogleProvider({
      id: "google-signin",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile: buildGoogleProfile,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: THIRTY_DAYS,
  },
  jwt: {
    maxAge: THIRTY_DAYS,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google-business") {
        if (!account.id_token) {
          return `${REGISTER_BUSINESS_PATH}?error=google_failed`;
        }

        const auth = await signInWithGoogle(account.id_token, "business");
        if (!auth) {
          return `${REGISTER_BUSINESS_PATH}?error=google_failed`;
        }

        const decoded = await verifyAccessToken(auth.access_token);
        if (!decoded) {
          return `${REGISTER_BUSINESS_PATH}?error=google_failed`;
        }

        // Backend-ul loghează userul existent pe rolul lui curent și ignoră
        // complet role_name atunci când email-ul/google_id-ul se potrivesc cu
        // un cont deja existent (ex. un client care s-a înregistrat cu parolă) —
        // nu putem preveni asta acolo, doar respingem sesiunea aici dacă rolul
        // rezultat nu e "business", ca userul să nu ajungă logat, fără să știe,
        // în alt cont decât cel pe care voia să-l creeze.
        if (decoded.role !== "business") {
          return `${REGISTER_BUSINESS_PATH}?error=not_business_account`;
        }

        user.accessToken = auth.access_token;
        user.refreshToken = auth.refresh_token;
        user.accessTokenExpires = decoded.exp * 1000;

        return true;
      }

      if (account?.provider === "google-register") {
        if (!account.id_token) {
          return `${REGISTER_PATH}?error=google_failed`;
        }

        const auth = await signInWithGoogle(account.id_token, "client");
        if (!auth) {
          return `${REGISTER_PATH}?error=google_failed`;
        }

        const decoded = await verifyAccessToken(auth.access_token);
        if (!decoded) {
          return `${REGISTER_PATH}?error=google_failed`;
        }

        // Aceeași rațiune ca la google-business: backend-ul ignoră role_name
        // și loghează pe rolul curent dacă emailul/google_id-ul se potrivesc
        // cu un cont existent — respingem aici dacă rolul rezultat nu e
        // "client", ca userul să nu ajungă logat, fără să știe, în alt cont.
        if (decoded.role !== "client") {
          return `${REGISTER_PATH}?error=not_client_account`;
        }

        user.accessToken = auth.access_token;
        user.refreshToken = auth.refresh_token;
        user.accessTokenExpires = decoded.exp * 1000;

        return true;
      }

      if (account?.provider === "google-signin") {
        if (!account.id_token) {
          return `${LOGIN_PATH}?error=google_failed`;
        }

        // Niciun role_name — un email fără cont existent dă 400 pe backend
        // ("role_name is required for new account registration"),
        // signInWithGoogle îl prinde și întoarce null; e exact comportamentul
        // dorit aici, pagina de login nu trebuie să creeze conturi noi.
        const auth = await signInWithGoogle(account.id_token);
        if (!auth) {
          return `${LOGIN_PATH}?error=google_failed`;
        }

        const decoded = await verifyAccessToken(auth.access_token);
        if (!decoded) {
          return `${LOGIN_PATH}?error=google_failed`;
        }

        user.accessToken = auth.access_token;
        user.refreshToken = auth.refresh_token;
        user.accessTokenExpires = decoded.exp * 1000;

        return true;
      }

      return true;
    },
    async jwt({ token, user, trigger, session }): Promise<JWT> {
      if (trigger === "update" && session) {
        try {
          const refreshed = await buildRefreshedJwt(token.refreshToken);
          return { ...token, ...refreshed };
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          LOG.error(
            "Error updating token with fresh user info: " + errorMessage
          );
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }

      if (user) {
        const [permissions, userInfo] = await Promise.all([
          fetchUserPermissions(user.accessToken),
          fetchUserInfo(user.accessToken),
        ]);

        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
          user_id: userInfo.id,
          is_validated: userInfo.is_validated,
          registration_step: userInfo.registration_step,
          username: userInfo.username,
          profession: userInfo.profession,
          business_id: userInfo.business_id,
          business_owner_id: userInfo.business_owner_id,
          business_type_id: userInfo.business_type_id,
          avatar: userInfo.avatar,
          has_employees: userInfo.has_employees,
          is_employee: userInfo.is_employee,
          permissions: permissions,
        };
      }
      if (token) {
        const expireInMillis = token.accessTokenExpires;

        // return previous token if the access token has not expired yet
        if (expireInMillis > new Date().getTime()) {
          return token;
        }

        try {
          const refreshed = await buildRefreshedJwt(token.refreshToken);
          return { ...token, ...refreshed, error: undefined };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          LOG.error(
            "Error updating token with fresh user info: " + errorMessage
          );
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }

      LOG.error("Session token does not contain a valid token!");
      return token;
    },
    async session({ session, token }) {
      if (token.user_id && token.permissions) {
        session.accessToken = token.accessToken;
        session.user_id = token.user_id;
        session.username = token.username;
        session.profession = token.profession;
        session.is_validated = token.is_validated;
        session.registration_step = token.registration_step;
        session.avatar = token.avatar;
        session.business_id = token.business_id;
        session.business_owner_id = token.business_owner_id;
        session.business_type_id = token.business_type_id;
        session.permissions = token.permissions;
        session.has_employees = token.has_employees;
        session.is_employee = token.is_employee;
      }

      const expireInMillis = token.accessTokenExpires;
      const expiresAt = new Date(expireInMillis).toISOString();
      const expireInSeconds = (expireInMillis - new Date().getTime()) / SECOND;

      LOG.info(
        `Access token is valid until [${expiresAt}], expire in ${expireInSeconds} sec.`
      );
      LOG.info(`Session was checked and updated with accessToken.`);
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
