import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import {
  ServiceDomain,
  ServiceDomainCreateOrUpdate,
} from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";

export const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = (
    await get<PaginatedData<ServiceDomain>>({
      url: `/service-domains?page=${page}&limit=${limit}&all=true`,
    })
  ).data;

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
  const data: ServiceDomainCreateOrUpdate = await req.json();

  const response = (
    await post({
      url: `/service-domains`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
  const { serviceDomainId } = await req.json();

  const response = (
    await deleteRequest({
      url: `/service-domains/${serviceDomainId}`,
    })
  ).data;

  return NextResponse.json(response);
};
