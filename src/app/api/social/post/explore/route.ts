import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  const businessTypesRaw = searchParams.get("businessTypeIds");

  let queryString = `page=${page}&limit=${limit}`;

  if (businessTypesRaw) {
    const ids = businessTypesRaw.split(",");
    ids.forEach((id) => {
      if (id) queryString += `&business_types=${id}`;
    });
  }

  const response = (
    await get<PaginatedData<Post>>({
      url: `/posts/explore?${queryString}`,
    })
  ).data;

  return NextResponse.json(response);
};
