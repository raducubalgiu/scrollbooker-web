import { getUserServerSession } from "@/lib/auth/get-user-server";
import { BusinessMapResponse } from "@/ts/models/booking/business/search/BusinessMapCombined";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { session } = await getUserServerSession();
  const business_domain_id = req.nextUrl.searchParams.get("businessDomainId");

  try {
    //const body = await req.json();

    //const { bbox } = body;

    const bbox = {
      min_lng: 25.961395,
      min_lat: 44.202274,
      max_lng: 26.243607,
      max_lat: 44.650467,
    };

    const [markersResult, listResult] = await Promise.allSettled([
      fetch(`${process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT}/businesses/markers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          bbox,
          business_domain_id,
        }),
        cache: "no-store",
      }),
      fetch(
        `${process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT}/businesses/locations?page=1&limit=10`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            bbox,
            business_domain_id,
          }),
          cache: "no-store",
        }
      ),
    ]);

    let markers = null;
    let list = null;

    if (markersResult.status === "fulfilled" && markersResult.value.ok) {
      markers = await markersResult.value.json();
    }

    if (listResult.status === "fulfilled" && listResult.value.ok) {
      list = await listResult.value.json();
    }

    const mainResults: BusinessMapResponse = { markers, list };

    return Response.json(mainResults);
  } catch (error) {
    console.error("Error in /api/businesses/map route:", error);
    return Response.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
