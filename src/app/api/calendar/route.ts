import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");
  const slotDuration = req.nextUrl.searchParams.get("slotDuration");

  const response = (
    await get({
      url: `/appointments/calendar-events?start_date=${startDate}&end_date=${endDate}&user_id=${session?.user_id}&slot_duration=${slotDuration}`,
    })
  ).data;

  return NextResponse.json(response);
};
