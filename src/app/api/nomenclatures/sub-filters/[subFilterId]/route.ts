import { deleteRequest } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    subFilterId: string;
  }>;
};

export const DELETE = async (_: NextRequest, context: RouteContext) => {
  const { subFilterId } = await context.params;

  const response = (
    await deleteRequest({
      url: `/sub-filters/${subFilterId}`,
    })
  ).data;

  return NextResponse.json(response);
};
