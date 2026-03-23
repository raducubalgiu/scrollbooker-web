import { FilterType } from "../filter/FilterType";
import { ServiceDomainsType } from "../serviceDomain/ServiceDomainType";

export type BusinessType = {
  id?: number;
  name: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
  service_domains: ServiceDomainsType[];
  filters?: FilterType[];
};
