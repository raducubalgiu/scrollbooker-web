import { NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { Product } from "@/ts/models/booking/product/Product";

export const GET = async () => {
  const { userId } = await getUserServerSession();

  const response = (
    await get<Product[]>({
      url: `/users/${userId}/currencies`,
    })
  ).data;

  return NextResponse.json(response);
};
