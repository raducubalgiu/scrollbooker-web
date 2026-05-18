const SortEnumBase = {
  RECOMMENDED: "recommended",
  DISTANCE: "distance",
  PRICE: "price",
  RATING: "rating",
} as const;

export type SearchSortEnum = (typeof SortEnumBase)[keyof typeof SortEnumBase];

const sortLabels: Record<SearchSortEnum, string> = {
  [SortEnumBase.RECOMMENDED]: "Recomandat",
  [SortEnumBase.DISTANCE]: "Distanță",
  [SortEnumBase.PRICE]: "Preț",
  [SortEnumBase.RATING]: "Evaluare",
};

export const SearchSortEnum = Object.assign(SortEnumBase, {
  all: Object.values(SortEnumBase).map((val) => ({
    value: val,
    label: sortLabels[val],
  })),
});

export interface BusinessMapRequest {
  bbox: BoundingBox;
  zoom: number;
  max_markers: number;

  business_domain_id?: number | null;
  service_domain_id?: number | null;
  service_id?: number | null;
  subfilter_ids?: number[] | null;
  user_location?: LocationLatLng | null;

  max_price?: number | string | null;
  sort?: SearchSortEnum | null;

  has_discount: boolean;

  start_date?: string | null;
  start_time?: string | null;
  end_time?: string | null;
}

export interface LocationLatLng {
  lat: number;
  lng: number;
}

export interface BoundingBox {
  min_lng: number;
  min_lat: number;
  max_lng: number;
  max_lat: number;
}
