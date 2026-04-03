import { PaginatedData } from "@/components/core/Table/Table";
import { BusinessMarker } from "./BusinessMarker";
import { BusinessSheet } from "./BusinessSheet";

export enum SearchSortEnum {
  Recommended = "recommended",
  Distance = "distance",
  Price = "price",
  Rating = "rating",
}

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
