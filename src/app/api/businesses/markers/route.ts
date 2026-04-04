import { post } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = (
    await post({
      url: "/businesses/markers",
      data: {
        bbox: body.bbox,
        zoom: body.zoom ?? 12,
        business_domain_id: body.business_domain_id ?? null,
        service_domain_id: body.service_domain_id ?? null,
        service_id: body.service_id ?? null,
        subfilter_ids:
          Array.isArray(body.subfilter_ids) && body.subfilter_ids.length > 0
            ? body.subfilter_ids
            : null,
        start_date: body.start_date ?? null,
        start_time: body.start_time ?? null,
        end_time: body.end_time ?? null,
        has_discount: Boolean(body.has_discount),
        max_price: body.max_price ?? null,
      },
    })
  ).data;

  return NextResponse.json(response);
}
