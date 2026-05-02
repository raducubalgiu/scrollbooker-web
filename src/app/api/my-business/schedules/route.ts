import { authOptions } from "@/lib/auth/authOptions";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { get } from "@/utils/requests";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest) => {
  const session = await getServerSession(authOptions);

  const response = (
    await get<Schedule[]>({
      url: `/users/${session?.user_id}/schedules`,
    })
  ).data;

  return NextResponse.json(response);
};
