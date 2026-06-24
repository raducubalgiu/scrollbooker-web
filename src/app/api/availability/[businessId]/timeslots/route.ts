import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { AvailableTimeslotsResponse } from "@/ts/models/booking/availability/AvailableTimeSlot";

type RouteContext = {
  params: Promise<{
    businessId: string;
  }>;
};

export const GET = async (req: NextRequest, context: RouteContext) => {
  const { businessId } = await context.params;

  const day = req.nextUrl.searchParams.get("day");
  const employeeId = req.nextUrl.searchParams.get("employeeId");
  const slotDuration = req.nextUrl.searchParams.get("slotDuration");

  if (!day || !slotDuration) {
    return NextResponse.json(
      { error: "Parametrul 'day' si 'slotDuration' este obligatoriu." },
      { status: 400 }
    );
  }

  const queryParams = new URLSearchParams();

  queryParams.append("day", day);
  queryParams.append("slot_duration", slotDuration);

  if (employeeId) {
    queryParams.append("employee_id", employeeId);
  }

  const apiUrl = `/businesses/${businessId}/availability/timeslots?${queryParams.toString()}`;

  const response = (
    await get<AvailableTimeslotsResponse>({
      url: apiUrl,
    })
  ).data;

  return NextResponse.json(response);
};
