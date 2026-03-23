import { PaginatedData } from "@/components/core/Table/Table";
import { SubFilterType } from "../../nomenclatures/subFilter/SubFilterType";

export type ProductFilterType = {
  id: number;
  name: string;
  sub_filters: SubFilterType[];
  type: string;
  unit?: string | undefined | null;
  minim?: number | undefined | null;
  maxim?: number | undefined | null;
  display_as_tab: boolean;
};

export type ProductType = {
  id: number;
  name: string;
  description: string | undefined | null;
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
  sessions_count: number | undefined | null;
  validity_days: number | undefined | null;
  filters: ProductFilterType[];
  created_at: string;
  updated_at: string;
};

export type ProductResponse = PaginatedData<ProductType>;
