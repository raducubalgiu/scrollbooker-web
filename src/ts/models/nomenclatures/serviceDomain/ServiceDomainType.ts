import { ServiceType } from "../service/ServiceType";

export type ServiceDomainsResponse = {
  id: number;
  name: string;
  description?: string;
  url?: string;
  thumbnail_url?: string;
  services: ServiceType[];
  created_at: string;
  updated_at: string;
};
