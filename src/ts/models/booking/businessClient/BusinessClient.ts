export type BusinessClientSource = "manual" | "scroll_booker";

export interface BusinessClient {
  id: number;
  business_id: number;
  user_id: number | null;
  added_by_user_id: number | null;
  fullname: string;
  phone: string | null;
  source: BusinessClientSource;
  created_at: string;
}

export interface BusinessClientCreate {
  fullname: string;
  phone: string | null;
}
