import { AppointmentBlock } from "@/ts/models/booking/appointment/Appointment";
import { post } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: AppointmentBlock = await req.json();

  const response = (
    await post({
      url: `/appointments/create-block-appointments`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
