import { NextRequest, NextResponse } from "next/server";
import { deleteRequest } from "@/utils/requests";

type RouteParams = {
  params: Promise<{
    postId: string;
  }>;
};

export const DELETE = async (_req: NextRequest, { params }: RouteParams) => {
  const { postId } = await params;

  const response = (
    await deleteRequest({
      url: `/posts/${postId}`,
    })
  ).data;

  return NextResponse.json(response);
};
