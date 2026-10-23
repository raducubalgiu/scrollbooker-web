import { ContactInfo } from "@/ts/models/user/ContactInfo";

export interface BusinessEmployee {
  [key: string]: unknown;
  id: number;
  username: string;
  fullname: string;
  avatar: string | null;
  job: string;
  hire_date: string;
  followers_count: number;
  ratings_count: number;
  ratings_average: number;
  products_count: number;
  instant_booking: boolean;
  contact_info: ContactInfo;
}
