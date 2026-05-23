import { ServiceDomainCreateOrUpdate } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import { put } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    serviceDomainId: string;
  }>;
};

export const PUT = async (req: NextRequest, context: RouteContext) => {
  const { serviceDomainId } = await context.params;

  const data: ServiceDomainCreateOrUpdate = await req.json();

  const response = (
    await put({
      url: `/service-domains/${serviceDomainId}`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
