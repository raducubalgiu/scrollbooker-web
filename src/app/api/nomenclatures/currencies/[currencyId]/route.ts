import { CurrencyCreateOrUpdate } from "@/ts/models/nomenclatures/currency/Currency";
import { put } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    currencyId: string;
  }>;
};

export const PUT = async (req: NextRequest, context: RouteContext) => {
  const { currencyId } = await context.params;

  const data: CurrencyCreateOrUpdate = await req.json();

  const response = (
    await put({
      url: `/currencies/${currencyId}`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
