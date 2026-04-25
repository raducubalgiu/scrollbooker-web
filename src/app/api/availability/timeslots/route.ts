import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { AvailableTimeslotsResponse } from "@/ts/models/booking/availability/AvailableTimeSlot";

export const GET = async (req: NextRequest) => {
  const day = req.nextUrl.searchParams.get("day");
  const userId = req.nextUrl.searchParams.get("userId");
  const slotDuration = req.nextUrl.searchParams.get("slotDuration");

  const response = (
    await get<AvailableTimeslotsResponse>({
      url: (() => {
        const params: string[] = [];

        if (userId != null)
          params.push(`user_id=${encodeURIComponent(userId)}`);
        if (day !== null) params.push(`day=${encodeURIComponent(day)}`);
        if (slotDuration !== null)
          params.push(`slot_duration=${encodeURIComponent(slotDuration)}`);

        return `/availability/timeslots${params.length ? `?${params.join("&")}` : ""}`;
      })(),
    })
  ).data;

  return NextResponse.json(response);
};
