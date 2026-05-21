import { NextRequest, NextResponse } from "next/server";
import { deleteRequest, get, post } from "@/utils/requests";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";

export const GET = async (req: NextRequest) => {
  const all = req.nextUrl.searchParams.get("all");

  const response = (
    await get<BusinessDomain[]>({
      url: `/business-domains?all=${all ? all : false}`,
    })
  ).data;

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const response = (
    await post({
      url: `/business-domains`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
  const { businessDomainId } = await req.json();

  const response = (
    await deleteRequest({
      url: `/business-domains/${businessDomainId}`,
    })
  ).data;

  return NextResponse.json(response);
};
