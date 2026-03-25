import { SubFilter } from "../subFilter/SubFilter";

export interface Filter {
  id: number;
  name: string;
  active: boolean;
  order_index: number;
  type: string;
  single_select: boolean;
  created_at: string;
  updated_at: string;
  sub_filters: SubFilter[];
}
