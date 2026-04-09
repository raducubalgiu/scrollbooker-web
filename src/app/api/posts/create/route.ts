import { post } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const response = (
    await post({
      url: `/posts`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
