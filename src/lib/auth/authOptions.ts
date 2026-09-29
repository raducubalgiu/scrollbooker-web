import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, User } from "next-auth";
import { LOG } from "@/utils/logger";
import { SECOND } from "@/utils/date-utils";
import { JWT } from "next-auth/jwt";
import {
  fetchUserInfo,
  fetchUserPermissions,
  loginWithCredentials,
  refreshAccessToken,
  verifyAccessToken,
} from "@/controllers/auth/auth.service";

const THIRTY_DAYS = 30 * 24 * 60 * 60;

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
  },
  pages: {
    signIn: "/auth/signin",
  },
};
