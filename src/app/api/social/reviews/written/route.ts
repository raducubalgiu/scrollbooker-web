import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { ReviewsResponse } from "@/ts/models/booking/review/Review";

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const ratingsAll = req.nextUrl.searchParams.getAll("ratings");
  const ratingsArray = ratingsAll
    .flatMap((r) =>
      r
        ? r
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : []
    )
    .filter(Boolean);

  const ratingsSuffix = ratingsArray.length
    ? ratingsArray.map((r) => `&ratings=${encodeURIComponent(r)}`).join("")
    : "";

  const response = (
    await get<ReviewsResponse>({
      url: `/users/${userId}/reviews?page=${page}&limit=${limit}${ratingsSuffix}`,
    })
  ).data;

  return NextResponse.json(response);
};
