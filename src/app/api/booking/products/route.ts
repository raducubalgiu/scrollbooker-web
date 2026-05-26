import { NextRequest, NextResponse } from "next/server";
import { deleteRequest } from "@/utils/requests";

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
