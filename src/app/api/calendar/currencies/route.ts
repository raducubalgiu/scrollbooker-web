import { NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { Product } from "@/ts/models/booking/product/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  const response = (
    await get<Product[]>({
      url: `/users/${session?.user_id}/currencies`,
    })
  ).data;

  return NextResponse.json(response);
};
