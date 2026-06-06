import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import {
  BusinessType,
  BusinessTypeCreateOrUpdate,
} from "@/ts/models/nomenclatures/businessType/BusinessType";

export const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const queryParams = new URLSearchParams({ all: "true" });

  if (page) queryParams.append("page", page);
  if (limit) queryParams.append("limit", limit);

  const response = (
    await get<PaginatedData<BusinessType>>({
      url: `/business-types?${queryParams.toString()}`,
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
  const { businessTypeId } = await req.json();

  const response = (
    await deleteRequest({
      url: `/business-types/${businessTypeId}`,
    })
  ).data;

  return NextResponse.json(response);
};
