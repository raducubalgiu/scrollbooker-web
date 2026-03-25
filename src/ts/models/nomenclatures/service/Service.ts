import { Filter } from "../filter/FilterType";

export interface ServiceFilter {
  id: number;
  name: string;
  sub_filters: Filter[];
}

export interface Service {
  id: number;
  name: string;
  short_name: string;
  active: boolean;
  type: string;
  business_domain_id: number;
}
