import { Consent } from "@/ts/models/nomenclatures/consent/Consent";
import { get } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest) => {
  const response = (
    await get<Consent[]>({
      url: `/consents`,
    })
  ).data;

  return NextResponse.json(response);
};
