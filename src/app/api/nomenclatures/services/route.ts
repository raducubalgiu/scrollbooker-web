import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import {
  Service,
  ServiceCreateOrUpdate,
} from "@/ts/models/nomenclatures/service/Service";

export const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = (
    await get<PaginatedData<Service>>({
      url: `/services?page=${page}&limit=${limit}&all=true`,
    })
  ).data;

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
  const data: ServiceCreateOrUpdate = await req.json();

  const response = (
    await post({
      url: "/services",
      data,
    })
  ).data;

  return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
  const { serviceId } = await req.json();

  const response = (
    await deleteRequest({
      url: `/services/${serviceId}`,
    })
  ).data;

  return NextResponse.json(response);
};
