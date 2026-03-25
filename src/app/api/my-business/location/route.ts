import { NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { Business } from "@/ts/models/booking/business/Business";

export const GET = async () => {
  const { userId } = await getUserServerSession();

  const response = (
    await get<Business>({
      url: `/users/${userId}/businesses`,
    })
  ).data;

  return NextResponse.json(response);
};
