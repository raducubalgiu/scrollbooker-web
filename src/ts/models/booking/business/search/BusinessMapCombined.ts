import { BusinessMarkerResponse } from "./BusinessMarker";

export type BusinessMapRequest = {
  bbox: BoundingBox;
  zoom?: number | 12;
  max_markers?: number | 400;
  business_domain_id?: number | null;
  service_domain_id?: number | null;
  subfilter_ids?: number[] | [];
  user_location?: [number, number] | null;
  max_price?: number | null;
  has_discount?: boolean | false;
};

export type BoundingBox = {
  min_lng: number;
  min_lat: number;
  max_lng: number;
  max_lat: number;
};

export type BusinessMapResponse = {
  markers: BusinessMarkerResponse;
  list: BusinessMapResponse;
};
