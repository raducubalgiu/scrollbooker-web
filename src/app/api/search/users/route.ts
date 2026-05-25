import { SearchUser } from "@/ts/models/search/SearchUser";
import { get } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams.get("query")?.trim() ?? "";
  const roleClientParam = req.nextUrl.searchParams.get("role_client");

  if (query.length < 2) {
    return NextResponse.json([]);
  }

  let baseUrl = `search/users?query=${encodeURIComponent(query)}`;

  if (roleClientParam !== null) {
    baseUrl += `&role_client=${roleClientParam}`;
  }

  const response = (
    await get<SearchUser[]>({
      url: baseUrl,
    })
  ).data;

  return NextResponse.json(response);
};
