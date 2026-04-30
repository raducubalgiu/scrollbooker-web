import { RegistrationStepEnum } from "@/ts/enums/RegistrationStepEnum";
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
    username: string;
    is_validated: boolean | null;
    registration_step: RegistrationStepEnum | null;
    avatar: string | null | undefined;
    business_id: number | null | undefined;
    business_type_id: number | null | undefined;
    has_employees: boolean | null | undefined;
    is_employee: boolean | null | undefined;
    permissions: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;

    // extra
    user_id: number;
    username: string;
    is_validated: boolean | null;
    registration_step: RegistrationStepEnum | null;
    avatar: string | null;
    business_id?: number | null;
    business_type_id?: number | null;
    has_employees?: boolean | null;
    is_employee?: boolean | null;
    permissions: string[];
    error?: "RefreshAccessTokenError" | undefined;
  }
}
