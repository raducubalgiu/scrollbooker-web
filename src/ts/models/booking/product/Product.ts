import { formatPrice } from "@/utils/formatPrice";
import { SubFilter } from "../../nomenclatures/subFilter/SubFilter";

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
  duration: number;
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
  offerings: ProductOffering[];
  has_different_offerings: boolean;
  filters: ProductFilter[];
  starting_price: number;
  starting_price_with_discount: number;
  starting_discount: number;
  starting_duration: number;
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
    const duration = product.has_multiple_offerings
      ? product.starting_duration
      : product.offerings[0]?.duration;

    if (!duration) return "";

    const durationText = this.getDurationText(duration);

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
    const price = product.has_different_offerings
      ? product.starting_price
      : product.offerings[0]?.price;

    if (!price) return "";

    return formatPrice(price);
  },

  getPriceWithDiscount(product: Product): string {
    const price_with_discount = product.has_different_offerings
      ? product.starting_price_with_discount
      : product.offerings[0]?.price_with_discount;

    if (!price_with_discount) return "";

    return formatPrice(price_with_discount);
  },

  getDiscount(product: Product): number {
    const discount = product.has_different_offerings
      ? product.starting_discount
      : product.offerings[0]?.discount;

    if (!discount) return 0;

    return discount;
  },
};
