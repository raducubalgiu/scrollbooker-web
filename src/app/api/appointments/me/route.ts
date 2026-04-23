import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { Appointment } from "@/ts/models/booking/appointment/Appointment";
import { PaginatedData } from "@/components/core/Table/Table";

export const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = (
    await get<PaginatedData<Appointment>>({
      url: `/appointments/me?page=${page}&limit=${limit}`,
    })
  ).data;

  return NextResponse.json(response);
};
