import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { AppointmentResponse } from "@/ts/models/booking/appointment/AppointmentResponse";

export const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");
  const asCustomer = req.nextUrl.searchParams.get("asCustomer");

  const response = (
    await get<AppointmentResponse[]>({
      url: `/appointments?page=${page}&limit=${limit}&asCustomer=${asCustomer}`,
    })
  ).data;

  return NextResponse.json(response);
};
