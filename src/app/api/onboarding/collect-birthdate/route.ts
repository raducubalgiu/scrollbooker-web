import { patch } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

type Payload = {
  birthdate: string | null;
};

export const PATCH = async (req: NextRequest) => {
  const data: Payload = await req.json();

  const response = (
    await patch({
      url: `/onboarding/collect-client-birthdate`,
      data,
    })
  ).data;

  return NextResponse.json(response);
};
