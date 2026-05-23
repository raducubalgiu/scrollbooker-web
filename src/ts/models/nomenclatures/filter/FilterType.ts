import { FilterTypeEnum } from "@/ts/enums/FilterTypeEnum";
import { SubFilter } from "../subFilter/SubFilter";

export interface Filter {
  id: number;
  name: string;
  active: boolean;
  type: string;
  single_select: boolean;
  created_at: string;
  updated_at: string;
  sub_filters: SubFilter[];
}

export interface FilterCreateOrUpdate {
  name: string;
  active: boolean;
  type: FilterTypeEnum;
  single_select: boolean;
}
