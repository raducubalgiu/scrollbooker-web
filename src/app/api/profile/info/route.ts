import { UserProfileInfoResponse } from "@/ts/models/user/UserProfileAbout";
import { get } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");

  const response = (
    await get<UserProfileInfoResponse>({
      url: `/users/${userId}/about`,
    })
  ).data;

  return NextResponse.json(response);
};
