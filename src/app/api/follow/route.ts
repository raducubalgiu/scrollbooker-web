import { NextRequest, NextResponse } from "next/server";
import { post, deleteRequest } from "@/utils/requests";

export const POST = async (req: NextRequest) => {
  const body = await req.json().catch(() => ({}));
  const followeeId =
    body?.followeeId ?? new URL(req.url).searchParams.get("followeeId");

  if (!followeeId) {
    return NextResponse.json(
      { error: "followeeId is required" },
      { status: 400 }
    );
  }

  const response = (
    await post({
      url: `/follows/${followeeId}`,
      data: {},
    })
  ).data;

  return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
  const body = await req.json().catch(() => ({}));
  const followeeId =
    body?.followeeId ?? new URL(req.url).searchParams.get("followeeId");

  if (!followeeId) {
    return NextResponse.json(
      { error: "followeeId is required" },
      { status: 400 }
    );
  }

  const response = (
    await deleteRequest({
      url: `/follows/${followeeId}`,
    })
  ).data;

  return NextResponse.json(response);
};
