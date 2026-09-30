export interface BusinessLeadCreate {
  fullname: string;
  email: string;
  phone: string;
  business_name: string;
  business_domain: string;
  city?: string;
}

export interface BusinessLeadResponse {
  success: boolean;
}
