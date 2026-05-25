import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

type RouteContext = {
  params: Promise<{
    businessTypeId: string;
  }>;
};

export const GET = async (_req: NextRequest, context: RouteContext) => {
  const { businessTypeId } = await context.params;

  const response = (
    await get({
      url: `/business-types/${businessTypeId}/professions`,
    })
  ).data;

  return NextResponse.json(response);
};
