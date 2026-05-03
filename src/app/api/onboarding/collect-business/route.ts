import { BusinessCreate } from "@/ts/models/booking/business/Business";
import { post } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: BusinessCreate = await req.json();

  const response = (
    await post({
      url: `/onboarding/collect-business`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
