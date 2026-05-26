import { NextRequest, NextResponse } from "next/server";
import { get, put } from "@/utils/requests";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";

type RouteContext = {
  params: Promise<{
    businessId: string;
  }>;
};

export const GET = async (_req: NextRequest, context: RouteContext) => {
  const { businessId } = await context.params;

  const response = (
    await get<SelectedServiceDomainWithServices[]>({
      url: `/businesses/${businessId}/service-domains`,
    })
  ).data;

  return NextResponse.json(response);
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
