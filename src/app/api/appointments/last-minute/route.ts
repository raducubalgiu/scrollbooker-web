import { AppointmentLastMinuteCreate } from "@/ts/models/booking/appointment/Appointment";
import { post } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: AppointmentLastMinuteCreate = await req.json();

  const response = (
    await post({
      url: `/appointments/create-last-minute-appointments`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
