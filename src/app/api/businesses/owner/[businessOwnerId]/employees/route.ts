import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";

type RouteContext = {
  params: Promise<{
    businessOwnerId: string;
  }>;
};

export const GET = async (req: NextRequest, context: RouteContext) => {
  const { businessOwnerId } = await context.params;

  if (!businessOwnerId) {
    return NextResponse.json(
      { error: "Unathorized: Business Owner Id is missing." },
      { status: 401 }
    );
  }

  const pagination = req.nextUrl.searchParams;

  const response = (
    await get<BusinessEmployee[]>({
      url: `/businesses/owner/${businessOwnerId}/employees?${pagination}`,
    })
  ).data;

  return NextResponse.json(response);
};
