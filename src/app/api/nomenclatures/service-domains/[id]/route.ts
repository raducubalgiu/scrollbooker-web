import { getUserServerSession } from "@/lib/auth/get-user-server";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // important: FormData + File forwarding stabil
export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getUserServerSession();
  const serviceDomainId = Number(id);

  if (!Number.isFinite(serviceDomainId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const incoming = await req.formData();
  const photo = incoming.get("photo");

  if (!photo || !(photo instanceof File)) {
    console.log("Missing photo!!!");
    return NextResponse.json({ error: "Missing photo" }, { status: 400 });
  }

  // Creezi un FormData NOU pentru backend (nu reutiliza direct incoming)
  const outgoing = new FormData();
  outgoing.set("photo", photo, photo.name);

  const backendBase = process.env.BE_BASE_ENDPOINT;
  if (!backendBase) {
    return NextResponse.json({ error: "Missing BACKEND_URL" }, { status: 500 });
  }

  const res = await fetch(
    `${backendBase}/business-types/${serviceDomainId}/photo`,
    {
      method: "PATCH",
      body: outgoing,
      headers: { Authorization: `Bearer ${user?.session?.accessToken}` },
    }
  );

  if (res.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  // Propagăm eroarea (body poate fi JSON de la FastAPI)
  const text = await res.text().catch(() => "");
  return new NextResponse(text || null, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "text/plain",
    },
  });
}
