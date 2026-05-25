import { EmploymentRequestRespond } from "@/ts/models/booking/employmentRequest/EmploymentRequest";
import { put } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    employmentRequestId: string;
  }>;
};

export const PUT = async (req: NextRequest, context: RouteContext) => {
  const { employmentRequestId } = await context.params;

  const data: EmploymentRequestRespond = await req.json();

  const response = (
    await put({
      url: `/employment-requests/${employmentRequestId}`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
