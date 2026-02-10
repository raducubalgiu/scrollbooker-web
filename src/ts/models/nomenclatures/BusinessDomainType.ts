import { ServiceDomainsResponse } from "./serviceDomain/ServiceDomainType";

export type BusinessDomainType = {
  id?: number;
  name: string;
  short_name: string;
  active?: boolean;
  order_index: number;
  service_domains: ServiceDomainsResponse[];
  created_at?: string;
  updated_at?: string;
};
