import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const page = params.get("page");
  const limit = params.get("limit");
  const id = params.get("id");

  const response = (
    await get<PaginatedData<ServiceDomain>>({
      url: `/service-domains/${id}/services?page=${page}&limit=${limit}`,
    })
  ).data;

  return NextResponse.json(response);
};
