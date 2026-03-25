import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { Consent } from "@/ts/models/nomenclatures/consent/Consent";

export const GET = async (req: NextRequest) => {
  const consentName = req.nextUrl.searchParams.get("consentName");

  const response = (
    await get<Consent>({
      url: `/consents/${consentName}`,
    })
  ).data;

  return NextResponse.json(response);
};
