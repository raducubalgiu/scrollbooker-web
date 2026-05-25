import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { Product } from "@/ts/models/booking/product/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  const serviceId = req.nextUrl.searchParams.get("serviceId");

  const response = (
    await get<Product[]>({
      url: `/users/${session?.user_id}/services/${serviceId}/products`,
    })
  ).data;

  return NextResponse.json(response);
};
