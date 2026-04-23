import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { Appointment } from "@/ts/models/booking/appointment/Appointment";

type RouteContext = {
  params: Promise<{
    appointmentId: string;
  }>;
};

export async function GET(_req: NextRequest, context: RouteContext) {
  const { appointmentId } = await context.params;

  const response = (
    await get<Appointment>({
      url: `/appointments/${appointmentId}`,
    })
  ).data;

  return NextResponse.json(response);
}
