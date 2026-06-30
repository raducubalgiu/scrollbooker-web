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

  const isValidParam = (val: string | null) => {
    return (
      val !== null && val !== "null" && val !== "undefined" && val.trim() !== ""
    );
  };

  if (!isValidParam(day) || !isValidParam(slotDuration)) {
    return NextResponse.json(
      {
        error:
          "Parametrii 'day' și 'slotDuration' sunt obligatorii și trebuie să aibă valori valide.",
      },
      { status: 400 }
    );
  }

  const queryParams = new URLSearchParams();
  queryParams.append("day", day!);
  queryParams.append("slot_duration", slotDuration!);

  if (isValidParam(employeeId)) {
    queryParams.append("employee_id", employeeId!);
  }

  const apiUrl = `/businesses/${businessId}/availability/timeslots?${queryParams.toString()}`;

  try {
    const response = (
      await get<AvailableTimeslotsResponse>({
        url: apiUrl,
      })
    ).data;

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error: "A apărut o eroare la preluarea intervalelor orare disponibile.",
      },
      { status: 500 }
    );
  }
};
