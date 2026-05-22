import { ConsentCreateOrUpdate } from "@/ts/models/nomenclatures/consent/Consent";
import { put } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    consentId: string;
  }>;
};

export const PUT = async (req: NextRequest, context: RouteContext) => {
  const { consentId } = await context.params;

  const data: ConsentCreateOrUpdate = await req.json();

  const response = (
    await put({
      url: `/consents/${consentId}`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
