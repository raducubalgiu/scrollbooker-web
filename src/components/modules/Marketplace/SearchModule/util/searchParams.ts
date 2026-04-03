import {
  BoundingBox,
  BusinessMapRequest,
  SearchSortEnum,
} from "@/ts/models/booking/business/search/BusinessMapCombined";

type SearchParamsLike = URLSearchParams;

function getString(params: SearchParamsLike, key: string): string | null {
  const value = params.get(key);
  if (!value || value.trim() === "") {
    return null;
  }
  return value;
}

function getNumber(params: SearchParamsLike, key: string): number | null {
  const value = params.get(key);
  if (!value || value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function getBoolean(params: SearchParamsLike, key: string): boolean {
  const value = params.get(key);
  return value === "true" || value === "1";
}

function getNumberArray(params: SearchParamsLike, key: string): number[] {
  const value = params.get(key);
  if (!value || value.trim() === "") {
    return [];
  }

  return value
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((item) => !Number.isNaN(item));
}

function getBoundingBox(params: SearchParamsLike): BoundingBox | null {
  const minLng = getNumber(params, "minLng");
  const minLat = getNumber(params, "minLat");
  const maxLng = getNumber(params, "maxLng");
  const maxLat = getNumber(params, "maxLat");

  if (
    minLng === null ||
    minLat === null ||
    maxLng === null ||
    maxLat === null
  ) {
    return null;
  }

  return {
    min_lng: minLng,
    min_lat: minLat,
    max_lng: maxLng,
    max_lat: maxLat,
  };
}

export function buildBusinessMapRequestFromSearchParams(
  params: SearchParamsLike
): BusinessMapRequest {
  return {
    bbox: getBoundingBox(params) || {
      min_lng: 25.961395,
      min_lat: 44.202274,
      max_lng: 26.243607,
      max_lat: 44.650467,
    },
    zoom: getNumber(params, "zoom") || 12,

    business_domain_id: getNumber(params, "domain"),
    service_domain_id: getNumber(params, "serviceDomain"),
    service_id: getNumber(params, "service"),
    subfilter_ids: getNumberArray(params, "subfilters"),

    start_date: getString(params, "startDate"),
    start_time: getString(params, "startTime"),
    end_time: getString(params, "endTime"),

    has_discount: getBoolean(params, "hasDiscount"),
    max_price: getNumber(params, "maxPrice"),
    sort: (getString(params, "sort") as SearchSortEnum | null) ?? null,

    max_markers: 400,
    user_location: null,
  };
}
