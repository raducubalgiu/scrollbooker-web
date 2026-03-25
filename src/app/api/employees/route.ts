import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";

export const GET = async (req: NextRequest) => {
  const businessOwnerId = req.nextUrl.searchParams.get("businessOwnerId");
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = (
    await get<BusinessEmployee[]>({
      url: `/businesses/owner/${businessOwnerId}/employees?page=${page}&limit=${limit}`,
    })
  ).data;

  return NextResponse.json(response);
};
