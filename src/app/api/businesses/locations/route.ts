import { post } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const zoom = request.nextUrl.searchParams.get("zoom");
  const business_domain_id = request.nextUrl.searchParams.get("businessDomain");
  const service_domain_id = request.nextUrl.searchParams.get("serviceDomain");
  const service_id = request.nextUrl.searchParams.get("service");
  const subfilter_ids = request.nextUrl.searchParams.getAll("subfilterIds");
  const start_date = request.nextUrl.searchParams.get("startDate");
  const start_time = request.nextUrl.searchParams.get("startTime");
  const end_time = request.nextUrl.searchParams.get("endTime");
  const has_discount = request.nextUrl.searchParams.get("hasDiscount");
  const max_price = request.nextUrl.searchParams.get("maxPrice");

  const response = (
    await post({
      url: `/businesses/locations?page=1&limit=20`,
      data: {
        bbox: {
          min_lng: 25.961395,
          min_lat: 44.202274,
          max_lng: 26.243607,
          max_lat: 44.650467,
        },
        //zoom: Number(zoom) ?? null,
        business_domain_id: Number(business_domain_id) ?? null,
        service_domain_id: Number(service_domain_id) ?? null,
        service_id: Number(service_id) ?? null,
        // subfilter_ids: subfilter_ids.map((id) => Number(id)) ?? [],
        //start_date: String(start_date) ?? null,
        //start_time: String(start_time) ?? null,
        //end_time: String(end_time) ?? null,
        has_discount: String(has_discount) === "true" ? true : false,
        max_price: max_price ? Number(max_price) : null,
      },
    })
  ).data;

  return NextResponse.json(response);
}
