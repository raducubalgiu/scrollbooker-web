import { NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { Service } from "@/ts/models/nomenclatures/service/Service";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  const response = (
    await get<Service[]>({
      url: `/users/${session?.user_id}/services`,
    })
  ).data;

  return NextResponse.json(response);
};
