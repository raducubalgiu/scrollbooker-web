import { ReviewsSummaryResponse } from "@/ts/models/booking/review/ReviewsSummaryType";
import { get } from "@/utils/requests";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");

  const response = (
    await get<ReviewsSummaryResponse>({
      url: `/users/${userId}/reviews-summary`,
    })
  ).data;

  return NextResponse.json(response);
};
