import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    serviceDomainId: string;
  }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  const { serviceDomainId } = await context.params;
  const session = await getServerSession(authOptions);

  if (!Number.isFinite(serviceDomainId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const incoming = await req.formData();
  const photo = incoming.get("photo");

  if (!photo || !(photo instanceof File)) {
    return NextResponse.json({ error: "Missing photo" }, { status: 400 });
  }

  const outgoing = new FormData();
  outgoing.set("photo", photo, photo.name);

  const backendBase = process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT;
  if (!backendBase) {
    return NextResponse.json({ error: "Missing BACKEND_URL" }, { status: 500 });
  }

  const res = await fetch(
    `${backendBase}/business-types/${serviceDomainId}/photo`,
    {
      method: "PATCH",
      body: outgoing,
      headers: { Authorization: `Bearer ${session?.accessToken}` },
    }
  );

  if (res.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const text = await res.text().catch(() => "");
  return new NextResponse(text || null, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "text/plain",
    },
  });
}
