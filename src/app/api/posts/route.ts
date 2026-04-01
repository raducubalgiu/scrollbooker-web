import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";

export const GET = async (req: NextRequest) => {
  const pagination = req.nextUrl.searchParams;

  const response = (
    await get<PaginatedData<Post>>({
      url: `/posts/explore?${pagination}`,
    })
  ).data;

  return NextResponse.json(response);
};
