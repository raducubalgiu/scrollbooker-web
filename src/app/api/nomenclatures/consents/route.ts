import {
  Consent,
  ConsentCreateOrUpdate,
} from "@/ts/models/nomenclatures/consent/Consent";
import { deleteRequest, get, post } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest) => {
  const response = (
    await get<Consent[]>({
      url: `/consents`,
    })
  ).data;

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
  const data: ConsentCreateOrUpdate = await req.json();

  const response = (
    await post({
      url: `/consents`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
  const { consentId } = await req.json();

  const response = (
    await deleteRequest({
      url: `/consents/${consentId}`,
    })
  ).data;

  return NextResponse.json(response);
};
