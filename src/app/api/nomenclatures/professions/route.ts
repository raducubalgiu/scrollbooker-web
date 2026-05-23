import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest } from "@/utils/requests";
import { ProfessionCreateOrUpdate } from "@/ts/models/nomenclatures/profession/ProfessionType";

export const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = (
    await get({
      url: `/professions?page=${page}&limit=${limit}&all=true`,
    })
  ).data;

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
  const data: ProfessionCreateOrUpdate = await req.json();

  const response = (
    await post({
      url: `/professions`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
  const { professionId } = await req.json();

  const response = (
    await deleteRequest({
      url: `/professions/${professionId}`,
    })
  ).data;

  return NextResponse.json(response);
};
