import { patch } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const data: number[] = await req.json();

  const response = (
    await patch({
      url: `/onboarding/collect-business-services`,
      data: { service_ids: data },
    })
  ).data;

  return NextResponse.json(response);
};
