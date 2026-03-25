import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import { BusinessType } from "@/ts/models/nomenclatures/businessType/BusinessType";

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id");
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = (
    await get<PaginatedData<BusinessType>>({
      url: `/business-domains/${id}/business-types?page=${page}&limit=${limit}`,
    })
  ).data;

  return NextResponse.json(response);
};
