import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.business_owner_id) {
    return NextResponse.json(
      { error: "Unathorized: Business Owner Id is missing." },
      { status: 401 }
    );
  }

  const businessOwnerId = session?.business_owner_id;
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = (
    await get<BusinessEmployee[]>({
      url: `/businesses/owner/${businessOwnerId}/employees?page=${page}&limit=${limit}`,
    })
  ).data;

  return NextResponse.json(response);
};
