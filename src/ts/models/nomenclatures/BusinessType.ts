import { FilterType } from "./FilterType";
import { ServiceDomainsResponse } from "./serviceDomain/ServiceDomainType";

export type BusinessType = {
  id?: number;
  name: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
  service_domains: ServiceDomainsResponse[];
  filters?: FilterType[];
};
