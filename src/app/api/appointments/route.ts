import { NextRequest, NextResponse } from "next/server";
import { get, put } from "@/utils/requests";
import { AppointmentResponse } from "@/ts/models/booking/appointment/AppointmentResponse";
import { omit } from "lodash";

export const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const businessId = req.nextUrl.searchParams.get("business_id");
  const employeeId = req.nextUrl.searchParams.get("employee_id");
  const asCustomer = req.nextUrl.searchParams.get("asCustomer");
  const status = req.nextUrl.searchParams.get("status");
  const channel = req.nextUrl.searchParams.get("channel");
  const startDate = req.nextUrl.searchParams.get("start_date");
  const endDate = req.nextUrl.searchParams.get("end_date");

  const response = (
    await get<AppointmentResponse[]>({
      url: (() => {
        const params: string[] = [];

        if (businessId != null)
          params.push(`business_id=${encodeURIComponent(businessId)}`);
        if (employeeId !== null)
          params.push(`employee_id=${encodeURIComponent(employeeId)}`);
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

        if (page !== null) params.push(`page=${encodeURIComponent(page)}`);
        if (limit !== null) params.push(`limit=${encodeURIComponent(limit)}`);

        return `/appointments${params.length ? `?${params.join("&")}` : ""}`;
      })(),
    })
  ).data;

  return NextResponse.json(response);
};

export const PUT = async (req: NextRequest) => {
  const data = await req.json();

  const response = (
    await put({
      url: `/appointments/${data.id}/cancel-appointment`,
      data: omit(data, "id"),
    })
  ).data;

  return NextResponse.json(response);
};
