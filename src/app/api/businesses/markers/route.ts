import { buildBusinessMapRequestFromSearchParams } from "@/components/modules/Marketplace/SearchModule/util/searchParams";
import { BusinessMapRequest } from "@/ts/models/booking/business/search/BusinessMapCombined";
import { post } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const data: BusinessMapRequest =
    buildBusinessMapRequestFromSearchParams(searchParams);

  const response = (
    await post({
      url: `/businesses/markers`,
      data,
    })
  ).data;

  return NextResponse.json(response);
}
