import { ScheduleUpdate } from "@/ts/models/booking/schedule/Schedule";
import { patch } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const data: ScheduleUpdate[] = await req.json();

  const response = (
    await patch({
      url: `/onboarding/collect-business-schedules`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
