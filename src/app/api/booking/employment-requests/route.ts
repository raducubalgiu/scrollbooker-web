import { NextRequest, NextResponse } from "next/server";
import { deleteRequest, get, post } from "@/utils/requests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  const response = (
    await get({
      url: `/users/${session?.user_id}/employment-requests`,
    })
  ).data;

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const response = (
    await post({
      url: `/employment-requests`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();

  const response = (
    await deleteRequest({
      url: `/employment-requests/${id}`,
    })
  ).data;

  return NextResponse.json(response);
};
