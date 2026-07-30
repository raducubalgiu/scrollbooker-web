import { NextResponse, NextRequest } from "next/server";
import { get, put } from "@/utils/requests";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");

  const response = (
    await get<Schedule>({
      url: `/users/${userId}/schedules`,
    })
  ).data;

  return NextResponse.json(response);
};

export const PUT = async (req: NextRequest) => {
  const data = await req.json();

  const response = (
    await put({
      url: "/schedules",
      data,
    })
  ).data;

  return NextResponse.json(response);
};
