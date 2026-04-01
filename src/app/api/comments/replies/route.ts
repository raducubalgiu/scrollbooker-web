import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";

export const GET = async (req: NextRequest) => {
  const postId = req.nextUrl.searchParams.get("postId");
  const commentId = req.nextUrl.searchParams.get("commentId");
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  console.log("Fetching replies for comment", {
    postId,
    commentId,
    page,
    limit,
  });

  const response = (
    await get<PaginatedData<Comment>>({
      url: `/posts/${postId}/comments/${commentId}/replies?page=${page}&limit=${limit}`,
    })
  ).data;

  return NextResponse.json(response);
};
