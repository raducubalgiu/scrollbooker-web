export type FilterSubfilterType = {
  id: number;
  name: string;
};

export type ServiceFilterType = {
  id: number;
  name: string;
  sub_filters: FilterSubfilterType[];
};

export type ServiceType = {
  id?: number;
  name: string;
  short_name: string;
  active?: boolean;
  keywords?: string[];
  type: string;
  business_domain_id: number;
  filters?: ServiceFilterType[];
};
