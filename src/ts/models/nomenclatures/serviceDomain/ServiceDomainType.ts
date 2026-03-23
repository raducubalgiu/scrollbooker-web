import { ServiceType } from "../service/ServiceType";

export type ServiceDomainCreate = {
  name: string;
};

export type ServiceDomainUpdate = {
  name: string;
};

export type ServiceDomainsType = {
  id: number;
  name: string;
  description?: string;
  url?: string;
  thumbnail_url?: string;
  services: ServiceType[];
  created_at: string;
  updated_at: string;
};

export type ServiceDomainsResponse = ServiceDomainsType[];
