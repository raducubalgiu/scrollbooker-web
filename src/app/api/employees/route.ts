import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { BusinessEmployeeResponse } from "@/ts/models/booking/business/BusinessEmployeeResponse";

export const GET = async (req: NextRequest) => {
  const businessId = req.nextUrl.searchParams.get("businessId");
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = (
    await get<BusinessEmployeeResponse>({
      url: `/businesses/${businessId}/employees?page=${page}&limit=${limit}`,
    })
  ).data;

  return NextResponse.json(response);
};
