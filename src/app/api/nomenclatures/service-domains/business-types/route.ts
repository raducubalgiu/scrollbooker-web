import { get } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const page = params.get("page");
  const limit = params.get("limit");
  const id = params.get("id");

  const response = (
    await get({
      url: `service-domains/${id}/business-types/check?page=${page}&limit=${limit}`,
    })
  ).data;

  console.log("RESPONSE!!!", response);

  return NextResponse.json(response);
};
