import { ServiceType } from "./ServiceType";

export type ServiceDomainsResponse = {
  id: number;
  name: string;
  order_index: number;
  created_at: string;
  updated_at: string;
  business_domain_id: number;
  services?: ServiceType[];
};
