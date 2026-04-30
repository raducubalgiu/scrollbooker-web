import { UserRegister } from "@/ts/models/auth/auth";
import { post } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: UserRegister = await req.json();

  const response = (
    await post({
      url: `/auth/register`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
