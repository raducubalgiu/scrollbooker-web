import { put } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    reviewId: string;
  }>;
};

export const PUT = async (_req: NextRequest, context: RouteContext) => {
  const { reviewId } = await context.params;

  const response = (
    await put({
      url: `/reviews/${reviewId}`,
      data: {},
    })
  ).data;

  return NextResponse.json(response);
};
