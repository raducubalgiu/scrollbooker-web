import { Service } from "../service/Service";

export interface ServiceDomainCreate {
  name: string;
}

export interface ServiceDomainUpdate {
  name: string;
}

export interface ServiceDomain {
  id: number;
  name: string;
  description?: string | null;
  url?: string | null;
  thumbnail_url?: string | null;
  active: boolean;
  services: Service[];
  created_at: string;
  updated_at: string;
}

export interface ServiceDomainCreateOrUpdate {
  name: string;
  description: string | null;
  active: boolean;
}
