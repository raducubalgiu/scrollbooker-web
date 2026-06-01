import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { CalendarEventsResponse } from "@/ts/models/booking/availability/CalendarEvents";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");
  const user_id = searchParams.get("user_id");
  const slot_duration = searchParams.get("slot_duration");

  if (!start_date || !end_date || !user_id || !slot_duration) {
    return NextResponse.json(
      {
        error:
          "Lipsesc parametri obligatorii (start_date, end_date, user_id, slot_duration).",
      },
      { status: 400 }
    );
  }

  const response = (
    await get<CalendarEventsResponse>({
      url: `/availability/calendar-events?user_id=${user_id}&slot_duration=${slot_duration}&start_date=${start_date}&end_date=${end_date}`,
    })
  ).data;

  return NextResponse.json(response);
}
