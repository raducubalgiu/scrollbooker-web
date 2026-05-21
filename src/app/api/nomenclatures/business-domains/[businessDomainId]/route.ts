import { BusinessDomainCreateOrUpdate } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { put } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    businessDomainId: string;
  }>;
};

export const PUT = async (req: NextRequest, context: RouteContext) => {
  const { businessDomainId } = await context.params;

  const data: BusinessDomainCreateOrUpdate = await req.json();

  const response = (
    await put({
      url: `/business-domains/${businessDomainId}`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
