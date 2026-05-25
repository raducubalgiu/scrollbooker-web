import { EmploymentRequestStatusEnum } from "@/ts/enums/EmploymentRequestStatusEnum";
import { put } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    employmentRequestId: string;
  }>;
};

export const PUT = async (_req: NextRequest, context: RouteContext) => {
  const { employmentRequestId } = await context.params;

  const response = (
    await put({
      url: `/employment-requests/${employmentRequestId}`,
      data: { status: EmploymentRequestStatusEnum.DENIED },
    })
  ).data;

  return NextResponse.json(response);
};
