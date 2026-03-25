import { SubFilterType } from "../../nomenclatures/subFilter/SubFilter";

export interface ProductFilter {
  id: number;
  name: string;
  sub_filters: SubFilterType[];
  type: string;
  unit?: string | null;
  minim?: number | null;
  maxim?: number | null;
  display_as_tab: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
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
  sessions_count?: number | null;
  validity_days?: number | null;
  filters: ProductFilter[];
  created_at: string;
  updated_at: string;
}
