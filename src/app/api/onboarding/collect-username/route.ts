import { patch } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const data = await req.json();

  const response = (
    await patch({
      url: `/onboarding/collect-user-username`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
