import { AppointmentOwnClientCreate } from "@/ts/models/booking/appointment/Appointment";
import { post } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: AppointmentOwnClientCreate = await req.json();

  const response = (
    await post({
      url: `/appointments/create-own-client-appointment`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
