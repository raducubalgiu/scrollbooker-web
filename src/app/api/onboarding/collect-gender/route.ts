import { patch } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const data = await req.json();

  const response = (
    await patch({
      url: `/onboarding/collect-client-gender`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
