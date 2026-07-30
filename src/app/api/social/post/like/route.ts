import { NextRequest, NextResponse } from "next/server";
import { deleteRequest, post } from "@/utils/requests";

type Payload = {
  post_id: number;
};

export const POST = async (req: NextRequest) => {
  const data: Payload = await req.json();

  const response = (
    await post({
      url: `/posts/${data.post_id}/likes`,
      data: {},
    })
  ).data;

  return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
  const data: Payload = await req.json();

  const response = (
    await deleteRequest({
      url: `/posts/${data.post_id}/likes`,
    })
  ).data;

  return NextResponse.json(response);
};
