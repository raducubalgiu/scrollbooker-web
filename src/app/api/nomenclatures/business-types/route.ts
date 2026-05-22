import { NextRequest, NextResponse } from "next/server";
import { get, post, put, deleteRequest } from "@/utils/requests";
import { omit } from "lodash";
import { PaginatedData } from "@/components/core/Table/Table";
import { BusinessType } from "@/ts/models/nomenclatures/businessType/BusinessType";

export const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = (
    await get<PaginatedData<BusinessType>>({
      url: `/business-types?page=${page}&limit=${limit}`,
    })
  ).data;

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const response = (
    await post({
      url: `/business-types`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};

export const PUT = async (req: NextRequest) => {
  const data = await req.json();

  const response = (
    await put({
      url: `/business-types/${data.id}`,
      data: omit(data, "id"),
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
