import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = (
    await get<PaginatedData<Post>>({
      url: `/users/${session?.user_id}/bookmark-posts?page=${page}&limit=${limit}`,
    })
  ).data;

  return NextResponse.json(response);
};
