import { SubFilter } from "../../nomenclatures/subFilter/SubFilter";
import { Service } from "../../nomenclatures/service/Service";
import { FilterTypeEnum } from "@/ts/enums/FilterTypeEnum";

export interface ProductFilter {
  id: number;
  name: string;
  sub_filters: SubFilter[];
  type: string;
  unit?: string | null;
  minim?: number | null;
  maxim?: number | null;
  display_as_tab: boolean;
}

export interface StartingOffering {
  id: number;
  variant_id: number;
  variant_name: string;
  duration: number;
  user_id: number;
  price: number;
  price_with_discount: number;
  discount: number;
}

export interface ProductOfferingUser {
  id: number;
  username: string;
  fullname: string;
  profession: string;
  avatar: string | null;
}

export interface ProductOffering {
  id: number;
  user: ProductOfferingUser;
  price: number;
  price_with_discount: number;
  discount: number;
}

export interface ProductVariant {
  id: number;
  name: string;
  duration: number;
  starting_offering: StartingOffering;
  has_different_prices: boolean;
  offerings: ProductOffering[];
}

export interface Product {
  [x: string]: unknown;
  id: number;
  name: string;
  description: string | null;
  service_id: number;
  business_id: number;
  business_owner_id: number;
  currency_id: number;
  can_be_booked: boolean;
  type: string;
  sessions_count?: number | null;
  validity_days?: number | null;
  starting_offering: StartingOffering;
  has_different_prices: boolean;
  variants: ProductVariant[];
  filters: ProductFilter[];
  created_at: string;
  updated_at: string;
}

export const ProductUtils = {
  getDurationText(minutes: number): string {
    if (minutes === 0) return "0min";

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursPart = hours > 0 ? `${hours}h` : "";
    const minutesPart = remainingMinutes > 0 ? `${remainingMinutes}min` : "";

    return [hoursPart, minutesPart].filter(Boolean).join(" ");
  },

  getFiltersSummary(product: Product): string {
    const filterParts = product.filters
      .map((filter) => {
        if (filter.type === "options") {
          return filter.sub_filters.map((sf) => sf.name).join(" & ");
        }
        if (filter.type === "range") {
          const { minim, maxim, unit } = filter;
          if (minim != null && maxim == null) return `> ${minim} ${unit}`;
          if (minim == null && maxim != null) return `< ${maxim} ${unit}`;
          return `${minim} - ${maxim} ${unit}`;
        }
        return null;
      })
      .filter(Boolean);

    return [filterParts].join(" \u2022 ");
  },
};

export interface BusinessProductsResponse {
  service: Service;
  products: Product[];
}
[];

// Create Products DTOs
export interface ProductFilterCreate {
  filter_id: number;
  sub_filter_ids: number[];
  type: FilterTypeEnum;
  minim: number | null;
  maxim: number | null;
  is_not_applicable: boolean;
}

export interface ProductOfferingCreate {
  user_id: number;
  price: number;
  discount: number;
  price_with_discount: number;
}

export interface ProductVariantCreate {
  name: string;
  duration: number;
  offerings: ProductOfferingCreate[];
}

export interface ProductCreate {
  name: string;
  description: string | null;
  service_domain_id: number;
  service_id: number;
  business_id: number;
  currency_id: number;
  can_be_booked: boolean;
  type: string;
  variants: ProductVariantCreate[];
}

export interface ProductWithFiltersCreate {
  product: ProductCreate;
  filters: ProductFilterCreate[];
}
