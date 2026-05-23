import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import {
  Filter,
  FilterCreateOrUpdate,
} from "@/ts/models/nomenclatures/filter/FilterType";

export const GET = async (req: NextRequest) => {
  const pagination = req.nextUrl.searchParams;

  const response = (
    await get<PaginatedData<Filter>>({
      url: `/filters?${pagination}`,
    })
  ).data;

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
  const data: FilterCreateOrUpdate = await req.json();

  const response = (
    await post({
      url: `/filters`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
  const { filterId } = await req.json();

  const response = (
    await deleteRequest({
      url: `/filters/${filterId}`,
    })
  ).data;

  return NextResponse.json(response);
};
