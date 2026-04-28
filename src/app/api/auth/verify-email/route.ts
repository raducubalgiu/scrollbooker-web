import { post } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const response = (
    await post({
      url: `/auth/verify-email`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
