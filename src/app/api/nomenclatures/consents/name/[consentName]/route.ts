import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { Consent } from "@/ts/models/nomenclatures/consent/Consent";

type RouteContext = {
  params: Promise<{
    consentName: string;
  }>;
};

export const GET = async (_req: NextRequest, context: RouteContext) => {
  const { consentName } = await context.params;

  const response = (
    await get<Consent>({
      url: `/consents/${consentName}`,
    })
  ).data;

  return NextResponse.json(response);
};
