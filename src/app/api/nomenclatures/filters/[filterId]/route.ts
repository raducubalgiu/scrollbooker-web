import { FilterCreateOrUpdate } from "@/ts/models/nomenclatures/filter/FilterType";
import { put } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    filterId: string;
  }>;
};

export const PUT = async (req: NextRequest, context: RouteContext) => {
  const { filterId } = await context.params;

  const data: FilterCreateOrUpdate = await req.json();

  const response = (
    await put({
      url: `/filters/${filterId}`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
