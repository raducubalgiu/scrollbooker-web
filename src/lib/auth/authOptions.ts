import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, User } from "next-auth";
import { LOG } from "@/utils/logger";
import { SECOND } from "@/utils/date-utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import axios, { AxiosResponse } from "axios";
import { map } from "lodash";
import { JWT } from "next-auth/jwt";
import { Permission } from "@/ts/models/user/Permission";

type DecodedTokenType = {
  id: number;
  sub: string;
  fullname: string;
  email: string;
  role: string;
  exp: number;
};

type AuthResponseType = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

const THIRTY_DAYS = 30 * 24 * 60 * 60;

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

        const auth = await login(username, password);
        if (!auth) return null;

        const decoded = await verifyToken(auth.access_token);
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
          const userInfo = await getUserInfo(token.accessToken);
          const permissions = await getPermissions(token.accessToken);

          return {
            ...token,
            user_id: userInfo.id,
            username: userInfo.username,
            is_validated: userInfo.is_validated,
            registration_step: userInfo.registration_step,
            avatar: userInfo.avatar,
            business_id: userInfo.business_id,
            business_type_id: userInfo.business_type_id,
            has_employees: userInfo.has_employees,
            is_employee: userInfo.is_employee,
            permissions: permissions,
          };
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
          getPermissions(user.accessToken),
          getUserInfo(user.accessToken),
        ]);

        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
          user_id: userInfo.id,
          is_validated: userInfo.is_validated,
          registration_step: userInfo.registration_step,
          username: userInfo.username,
          business_id: userInfo.business_id,
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
          const refreshed = await refreshToken(token.refreshToken);
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
        session.is_validated = token.is_validated;
        session.registration_step = token.registration_step;
        session.avatar = token.avatar;
        session.business_id = token.business_id;
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

async function login(
  username: string,
  password: string
): Promise<AuthResponseType | null> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT}/auth/login`,
      new URLSearchParams({ username, password }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return response.data;
  } catch (error: unknown) {
    // Enhanced logging to aid debugging 401/500 responses from backend
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errAny: any = error;
    if (errAny && errAny.response) {
      try {
        LOG.error(
          `Login request failed: status=${errAny.response.status}, data=${JSON.stringify(
            errAny.response.data
          )}`
        );
      } catch (e) {
        LOG.error(`Login request failed: ${errAny.response.status}`);
      }
    } else if (error instanceof Error) {
      LOG.error(`Login Error: ${error.message}`);
    } else {
      LOG.error(`Login Error: unknown error`);
    }

    // return null so authorize treats login as failure (previous behavior)
    return null;
  }
}

async function verifyToken(token: string): Promise<DecodedTokenType | null> {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & DecodedTokenType;

    if (!decoded.id || !decoded.role) {
      LOG.error("Invalid token or missing User id or Role");
      return null;
    }

    return decoded;
  } catch (err) {
    LOG.error(`JWT verification failed, ${err}`);
    return null;
  }
}

async function getPermissions(token: string): Promise<string[]> {
  const userPermissions: AxiosResponse<Permission[]> = await axios.get(
    `${process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT}/auth/user-permissions`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return map(userPermissions.data, "code");
}

async function getUserInfo(token: string) {
  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT}/auth/user-info`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return user.data;
}

async function refreshToken(refreshToken: string): Promise<JWT> {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT}/auth/refresh`,
      { refresh_token: refreshToken }
    );

    const decoded = await verifyToken(data.access_token);
    if (!decoded?.exp) throw new Error("Invalid refreshed token");

    const [permissions, userInfo] = await Promise.all([
      getPermissions(data.access_token),
      getUserInfo(data.access_token),
    ]);

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      accessTokenExpires: decoded.exp * 1000,
      user_id: userInfo.id,
      username: userInfo.username,
      is_validated: userInfo.is_validated,
      registration_step: userInfo.registration_step,
      permissions: permissions,
      avatar: userInfo.avatar,
      business_id: userInfo.business_id,
      business_type_id: userInfo.business_type_id,
      has_employees: userInfo.has_employees,
      is_employee: userInfo.is_employee,
    };
  } catch (e) {
    LOG.error("Token cannot be refreshed! Session will be terminated");
    throw e;
  }
}
