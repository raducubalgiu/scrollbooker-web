export interface UserRegister {
  email: string;
  password: string;
  role_name: string;
}

export interface UserInfo {
  id: number;
  username: string;
  fullname: string;
  avatar: string | null;
  business_id: number | null;
  business_owner_id: number | null;
  business_type_id: number | null;
  has_employees: boolean;
  is_employee: boolean;
  is_validated: boolean;
  registration_step: string | null;
}
