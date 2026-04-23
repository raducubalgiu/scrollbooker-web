import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;

    accessToken: string;
    username: string;
    refreshToken: string;
    accessTokenExpires: number;
  }

  interface Session extends DefaultSession {
    accessToken: string;
    user_id: number;
    avatar: string | null | undefined;
    business_id: number | null | undefined;
    business_type_id: number | null | undefined;
    has_employees: boolean | null | undefined;
    is_employee: boolean | null | undefined;
    username: string;
    permissions: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;

    // extra
    permissions?: string[];
    user_id?: number;
    avatar?: string | null;
    business_id?: number | null;
    business_type_id?: number | null;
    has_employees?: boolean | null;
    is_employee?: boolean | null;
    error?: "RefreshAccessTokenError";
  }
}
