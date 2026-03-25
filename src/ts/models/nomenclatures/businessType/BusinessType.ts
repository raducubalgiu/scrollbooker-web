import { Filter } from "../filter/FilterType";
import { ServiceDomain } from "../serviceDomain/ServiceDomainType";

export interface BusinessType {
  id: number;
  name: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  service_domains: ServiceDomain[];
  filters: Filter[];
}
