import { deleteRequest } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    employmentRequestId: string;
  }>;
};

export const DELETE = async (_req: NextRequest, context: RouteContext) => {
  const { employmentRequestId } = await context.params;

  const response = (
    await deleteRequest({
      url: `/employment-requests/${employmentRequestId}/cancel`,
    })
  ).data;

  return NextResponse.json(response);
};
