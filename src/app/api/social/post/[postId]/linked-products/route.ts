import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { Product } from "@/ts/models/booking/product/Product";

type RouteParams = {
  params: Promise<{
    postId: string;
  }>;
};

export const GET = async (_req: NextRequest, { params }: RouteParams) => {
  const { postId } = await params;

  const response = (
    await get<Product[]>({
      url: `/posts/${postId}/products`,
    })
  ).data;

  return NextResponse.json(response);
};
