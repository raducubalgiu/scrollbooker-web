import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams.get("query");

  const response = (
    await get<PaginatedData<BusinessDomain>>({
      url: `/places?query=${query}`,
    })
  ).data;

  return NextResponse.json(response);
};
