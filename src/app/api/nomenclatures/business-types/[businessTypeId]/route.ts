import { BusinessTypeCreateOrUpdate } from "@/ts/models/nomenclatures/businessType/BusinessType";
import { put } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    businessTypeId: string;
  }>;
};

export const PUT = async (req: NextRequest, context: RouteContext) => {
  const { businessTypeId } = await context.params;

  const data: BusinessTypeCreateOrUpdate = await req.json();

  const response = (
    await put({
      url: `/business-types/${businessTypeId}`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
