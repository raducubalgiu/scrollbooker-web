import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ detail: "Neautorizat" }, { status: 401 });
  }

  if (!session.business_id) {
    return NextResponse.json(
      { detail: "Business ID lipsește din sesiune" },
      { status: 400 }
    );
  }

  try {
    const formData = await req.formData();

    const beResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT}/onboarding/collect-business-gallery/${session.business_id}/update`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: formData,
      }
    );

    const payload = await beResponse.json().catch(() => ({}));
    return NextResponse.json(payload, { status: beResponse.status });
  } catch (error: any) {
    console.error("Gallery Upload Error:", error?.message || error);
    return NextResponse.json(
      { detail: "Eroare la încărcarea galeriei" },
      { status: 500 }
    );
  }
}
