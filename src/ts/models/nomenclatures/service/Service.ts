import { ServiceTypeEnum } from "@/ts/enums/ServiceTypeEnum";
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
  type: ServiceTypeEnum;
  business_domain_id: number;
  filters: ServiceFilter[];
}

export interface ServiceCreateOrUpdate {
  name: string;
  short_name: string;
  description: string | null;
  business_domain_id: number;
  type: ServiceTypeEnum;
  active: boolean;
}
