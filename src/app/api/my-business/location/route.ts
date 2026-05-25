import { NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { Business } from "@/ts/models/booking/business/Business";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  const response = (
    await get<Business>({
      url: `/users/${session?.user_id}/businesses`,
    })
  ).data;

  return NextResponse.json(response);
};
