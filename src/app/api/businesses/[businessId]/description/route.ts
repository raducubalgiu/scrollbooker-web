import { put } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    businessId: string;
  }>;
};

export const PUT = async (req: NextRequest, context: RouteContext) => {
  const { businessId } = await context.params;
  const data = await req.json();

  const response = (
    await put({
      url: `/businesses/${businessId}/description`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
