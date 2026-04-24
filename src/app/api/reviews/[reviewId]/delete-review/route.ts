import { deleteRequest } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    reviewId: string;
  }>;
};

export const DELETE = async (_req: NextRequest, context: RouteContext) => {
  const { reviewId } = await context.params;

  const response = (
    await deleteRequest({
      url: `/reviews/${reviewId}`,
    })
  ).data;

  return NextResponse.json(response);
};
