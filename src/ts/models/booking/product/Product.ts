import { formatPrice } from "@/utils/formatPrice";
import { SubFilter } from "../../nomenclatures/subFilter/SubFilter";
import { Service } from "../../nomenclatures/service/Service";

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

export interface ProductOffering {
  user_id: number;
  price: number;
  price_with_discount: number;
  discount: number;
}

export interface ProductVariant {
  id: number;
  name: string;
  duration: number;
  starting_price: number;
  starting_price_with_discount: number;
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
  currency_id: number;
  can_be_booked: boolean;
  type: string;
  sessions_count?: number | null;
  validity_days?: number | null;
  starting_duration: number;
  starting_price: number;
  starting_price_with_discount: number;
  starting_discount: number;
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
    const durationText = this.getDurationText(product.starting_duration);

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

    return [durationText, ...filterParts].join(" \u2022 ");
  },

  getPrice(product: Product): string {
    return formatPrice(product.starting_price);
  },

  getPriceWithDiscount(product: Product): string {
    return formatPrice(product.starting_price_with_discount);
  },

  getDiscount(product: Product): number {
    return product.starting_discount ?? 0;
  },

  getPriceLabel(product: Product): string {
    const prefix = product.has_different_prices ? "de la " : "";
    return `${prefix}${this.getPrice(product)}`;
  },
};

export interface BusinessProductsResponse {
  service: Service;
  products: Product[];
}
[];
