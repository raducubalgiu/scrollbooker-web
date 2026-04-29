import { SearchUsername } from "@/ts/models/user/SearchUsername";
import { get } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams.get("query")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json([]);
  }

  const response = (
    await get<SearchUsername>({
      url: `users/available-username?username=${query}`,
    })
  ).data;

  return NextResponse.json(response);
};
