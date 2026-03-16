import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { BusinessResponse } from "@/ts/models/booking/business/BusinessResponse";

export const GET = async (req: NextRequest) => {
  const { userId } = await getUserServerSession();

  const response = (
    await get<BusinessResponse>({
      url: `/users/${userId}/businesses`,
    })
  ).data;

  return NextResponse.json(response);
};
