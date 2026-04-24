import { put } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    appointmentId: string;
  }>;
};

export const PUT = async (req: NextRequest, context: RouteContext) => {
  const { appointmentId } = await context.params;
  const data = await req.json();

  console.log("DATA!!!!", data);

  const response = (
    await put({
      url: `/appointments/${appointmentId}/cancel-appointment`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
