import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = (
    await get({
      url: `/users/${userId}/followers?page=${page}&limit=${limit}`,
    })
  ).data;

  return NextResponse.json(response);
};
