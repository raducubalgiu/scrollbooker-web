import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { AppointmentResponse } from "@/ts/models/booking/appointment/AppointmentResponse";

export const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");
  const asCustomer = req.nextUrl.searchParams.get("asCustomer");
  const status = req.nextUrl.searchParams.get("status");
  const channel = req.nextUrl.searchParams.get("channel");
  const startDate = req.nextUrl.searchParams.get("start_date");
  const endDate = req.nextUrl.searchParams.get("end_date");

  const response = (
    await get<AppointmentResponse[]>({
      url: (() => {
        const params: string[] = [];

        if (page !== null) params.push(`page=${encodeURIComponent(page)}`);
        if (limit !== null) params.push(`limit=${encodeURIComponent(limit)}`);
        if (asCustomer !== null)
          params.push(`as_customer=${encodeURIComponent(asCustomer)}`);
        if (status !== null)
          params.push(`appointment_status=${encodeURIComponent(status)}`);
        if (channel !== null)
          params.push(`channel=${encodeURIComponent(channel)}`);
        if (startDate !== null)
          params.push(`start_date=${encodeURIComponent(startDate)}`);
        if (endDate !== null)
          params.push(`end_date=${encodeURIComponent(endDate)}`);

        return `/appointments${params.length ? `?${params.join("&")}` : ""}`;
      })(),
    })
  ).data;

  return NextResponse.json(response);
};
