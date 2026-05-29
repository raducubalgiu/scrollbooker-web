import { Filter } from "@/ts/models/nomenclatures/filter/FilterType";
import { get } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    serviceId: string;
  }>;
};

export const GET = async (_req: NextRequest, context: RouteContext) => {
  const { serviceId } = await context.params;

  const response = (
    await get<Filter[]>({
      url: `/services/${serviceId}/filters`,
    })
  ).data;

  return NextResponse.json(response);
};
