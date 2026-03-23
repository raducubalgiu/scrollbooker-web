import { ServiceDomainsType } from "../serviceDomain/ServiceDomainType";

export type BusinessDomainType = {
  id?: number;
  name: string;
  short_name: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
  service_domains: ServiceDomainsType[];
};

export type BusinessDomainsResponse = BusinessDomainType[];
