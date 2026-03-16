import { ProductTypeEnum } from "@/ts/enums/ProductTypeEnum";
import { SubFilterType } from "../../nomenclatures/subFilter/SubFilterType";

export type ProductFilterResponse = {
  id: number;
  name: string;
  sub_filters: SubFilterType[];
  type: ProductTypeEnum;
  unit?: string;
  minim?: number;
  maxim?: number;
  display_as_tab: boolean;
};

export type ProductResponse = {
  id: number;
  name: string;
  description: string;
  user_id: number;
  service_id: number;
  business_id: number;
  currency_id: number;
  price: number;
  price_with_discount: number;
  discount: number;
  duration: number;
  can_be_booked: boolean;
  type: string;
  sessions_count: number;
  validity_days: number;
  filters: ProductFilterResponse[];
  created_at: string;
  updated_at: string;
};
