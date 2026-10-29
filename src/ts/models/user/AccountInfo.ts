import { AuthProviderEnum } from "@/ts/enums/AuthProviderEnum";

export interface AccountInfo {
  account_phone: string | null;
  account_phone_verified: boolean;
  email: string;
  email_verified: boolean;
  auth_provider: AuthProviderEnum;
}

export interface AccountPhoneVerificationCheckRequest {
  phone: string;
  code: string;
}

export interface AccountPhoneVerificationResponse {
  account_phone: string | null;
  account_phone_verified: boolean;
}
