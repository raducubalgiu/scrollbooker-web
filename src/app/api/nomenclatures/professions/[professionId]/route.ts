import { ProfessionCreateOrUpdate } from "@/ts/models/nomenclatures/profession/ProfessionType";
import { put } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    professionId: string;
  }>;
};

export const PUT = async (req: NextRequest, context: RouteContext) => {
  const { professionId } = await context.params;

  const data: ProfessionCreateOrUpdate = await req.json();

  const response = (
    await put({
      url: `/professions/${professionId}`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
