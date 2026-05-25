import { authOptions } from "@/lib/auth/authOptions";
import { get } from "@/utils/requests";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  const response = (
    await get({
      url: `/users/${session?.username}/user-profile`,
    })
  ).data;

  return NextResponse.json(response);
};
