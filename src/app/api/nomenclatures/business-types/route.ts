import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import {
  BusinessType,
  BusinessTypeCreateOrUpdate,
} from "@/ts/models/nomenclatures/businessType/BusinessType";

export const GET = async (req: NextRequest) => {
  const pagination = req.nextUrl.searchParams;

  const response = (
    await get<PaginatedData<BusinessType>>({
      url: `/business-types?${pagination}`,
    })
  ).data;

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
  const data: BusinessTypeCreateOrUpdate = await req.json();

  const response = (
    await post({
      url: `/business-types`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();

  const response = (
    await deleteRequest({
      url: `/business-types/${id}`,
    })
  ).data;

  return NextResponse.json(response);
};
