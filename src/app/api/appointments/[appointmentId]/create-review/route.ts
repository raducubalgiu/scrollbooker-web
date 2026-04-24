import { AppointmentCreate } from "@/ts/models/booking/appointment/Appointment";
import { post } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    appointmentId: string;
  }>;
};

export const POST = async (req: NextRequest, context: RouteContext) => {
  const { appointmentId } = await context.params;
  const data: AppointmentCreate = await req.json();

  const response = (
    await post({
      url: `/appointments/${appointmentId}/create-review`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
