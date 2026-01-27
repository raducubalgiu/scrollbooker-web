import { FilterType } from "../FilterType";

export type ServiceType = {
  id?: number;
  name: string;
  display_name: string;
  active?: boolean;
  keywords?: string[];
  type: string;
  business_domain_id: number;
  service_domain_id: number;
  filters?: FilterType[];
};
