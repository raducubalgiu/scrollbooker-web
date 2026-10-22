export interface UserRegister {
  email: string;
  password: string;
  role_name: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface UserInfo {
  id: number;
  username: string;
  profession: string;
  fullname: string;
  avatar: string | null;
  business_id: number | null;
  business_owner_id: number | null;
  business_type_id: number | null;
  has_employees: boolean;
  instant_booking: boolean;
  is_employee: boolean;
  is_validated: boolean;
  registration_step: string | null;
}

export interface UnfinishedRegistration {
  id: number;
  email: string;
  username: string;
  fullname: string;
  role_name: string;
  registration_step: string | null;
  created_at: string;
}

export interface PhoneVerificationSendRequest {
  phone: string;
}

export interface PhoneVerificationSendResponse {
  detail: string;
}

export interface PhoneVerificationCheckRequest {
  code: string;
  phone: string;
}
