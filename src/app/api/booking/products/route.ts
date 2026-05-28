import { NextRequest, NextResponse } from "next/server";
import { deleteRequest, post } from "@/utils/requests";
import { ProductWithFiltersCreate } from "@/ts/models/booking/product/Product";

export const DELETE = async (req: NextRequest) => {
  const { productId } = await req.json();

  if (!productId) {
    return NextResponse.json(
      { error: "Product Id is missing" },
      { status: 400 }
    );
  }

  const response = (
    await deleteRequest({
      url: `/products/${productId}`,
    })
  ).data;

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
  const data: ProductWithFiltersCreate = await req.json();

  const response = (
    await post({
      url: `/products`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
