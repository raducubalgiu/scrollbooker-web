import { SubFilterType } from "./SubFilterType";

export type FilterType = {
  id: number;
  name: string;
  active: boolean;
  order_index: number;
  type: string;
  single_select: boolean;
  created_at: string;
  updated_at: string;
  sub_filters?: SubFilterType[];
};

export type PaginatedFilterType = {
  count: number;
  results: FilterType[];
};
