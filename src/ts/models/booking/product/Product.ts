import { SubFilter } from "../../nomenclatures/subFilter/SubFilter";
import { Service } from "../../nomenclatures/service/Service";

export interface ProductFilter {
  id: number;
  name: string;
  sub_filters: SubFilter[];
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

  getFiltersSummary(product: Product) {
    const filterParts = product.filters
      .map((filter) => {
        if (!filter.sub_filters || filter.sub_filters.length === 0) {
          return null;
        }
        return filter.sub_filters.map((sf) => sf.name).join(" & ");
      })
      .filter(Boolean);

    return filterParts.join(" \u2022 ");
  },

  getTargetUserId(product: Product): number {
    const allUserIds = product.variants.flatMap((variant) =>
      variant.offerings.map((offering) => offering.user.id)
    );
    const uniqueUserIds = Array.from(new Set(allUserIds));

    return uniqueUserIds.length === 1
      ? uniqueUserIds[0]!
      : product.business_owner_id;
  },
};

export interface BusinessServicesWithProducts {
  service: Service;
  products: Product[];
}

export interface UserProducts {
  total_count: number;
  data: BusinessServicesWithProducts[];
}

// Create Products DTOs
export interface ProductFilterCreate {
  filter_id: number;
  sub_filter_ids: number[];
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
