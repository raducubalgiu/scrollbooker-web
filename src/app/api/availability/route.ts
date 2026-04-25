import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");
  const userId = req.nextUrl.searchParams.get("userId");

  const response = (
    await get<string[]>({
      url: `/availability?user_id=${userId}&start_date=${startDate}&end_date=${endDate}`,
    })
  ).data;

  return NextResponse.json(response);
};
