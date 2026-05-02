import { BusinessHasEmployeesUpdate } from "@/ts/models/onboarding/Onboarding";
import { patch } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const data: BusinessHasEmployeesUpdate = await req.json();

  const response = (
    await patch({
      url: `/onboarding/collect-business-has-employees`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
