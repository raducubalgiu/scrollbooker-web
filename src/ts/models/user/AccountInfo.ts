export interface AccountInfo {
  account_phone: string | null;
  account_phone_verified: boolean;
  email: string;
  email_verified: boolean;
}

export interface AccountPhoneVerificationCheckRequest {
  phone: string;
  code: string;
}

export interface AccountPhoneVerificationResponse {
  account_phone: string | null;
  account_phone_verified: boolean;
}
