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

export interface Product {
  [x: string]: unknown;
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
    const durationText = this.getDurationText(product.duration);

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
};
