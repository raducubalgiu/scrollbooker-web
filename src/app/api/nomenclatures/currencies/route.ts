import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import {
  Currency,
  CurrencyCreateOrUpdate,
} from "@/ts/models/nomenclatures/currency/Currency";

export const GET = async (_req: NextRequest) => {
  const response = (
    await get<PaginatedData<Currency>>({
      url: `/currencies`,
    })
  ).data;

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
  const data: CurrencyCreateOrUpdate = await req.json();

  const response = (
    await post({
      url: `/currencies`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
  const { currencyId } = await req.json();

  const response = (
    await deleteRequest({
      url: `/currencies/${currencyId}`,
    })
  ).data;

  return NextResponse.json(response);
};
