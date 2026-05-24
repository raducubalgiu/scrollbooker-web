import { ServiceCreateOrUpdate } from "@/ts/models/nomenclatures/service/Service";
import { put } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    serviceId: string;
  }>;
};

export const PUT = async (req: NextRequest, context: RouteContext) => {
  const { serviceId } = await context.params;

  const data: ServiceCreateOrUpdate = await req.json();

  const response = (
    await put({
      url: `/services/${serviceId}`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
