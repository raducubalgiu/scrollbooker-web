export interface AccountInfo {
  private_phone: string | null;
  private_phone_verified: boolean;
  email: string;
  email_verified: boolean;
}

export interface PrivatePhoneVerificationCheckRequest {
  phone: string;
  code: string;
}

export interface PrivatePhoneVerificationResponse {
  private_phone: string | null;
  private_phone_verified: boolean;
}
