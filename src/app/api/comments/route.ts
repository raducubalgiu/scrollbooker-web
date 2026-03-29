import { NextRequest, NextResponse } from "next/server";
import { get, post } from "@/utils/requests";
import { PostCommentCreate } from "@/ts/models/social/PostComment";

export const GET = async (req: NextRequest) => {
  const postId = req.nextUrl.searchParams.get("postId");
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = (
    await get({
      url: `/posts/${postId}/comments?page=${page}&limit=${limit}`,
    })
  ).data;

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
  const data: PostCommentCreate = await req.json();

  const response = (
    await post({
      url: `/posts/${data.post_id}/comments`,
      data: {
        text: data.text,
        parent_id: data?.parent_id,
      },
    })
  ).data;

  return NextResponse.json(response);
};
