import { NextRequest, NextResponse } from "next/server";
import { put } from "@/utils/requests";

type RouteContext = {
  params: Promise<{
    businessId: string;
  }>;
};

export const PUT = async (req: NextRequest, context: RouteContext) => {
  const { businessId } = await context.params;
  const data: number[] = await req.json();

  const response = (
    await put({
      url: `/businesses/${businessId}/update-services`,
      data: { service_ids: data },
    })
  ).data;

  return NextResponse.json(response);
};
