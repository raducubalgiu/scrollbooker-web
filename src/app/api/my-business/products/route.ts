import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { ProductResponse } from "@/ts/models/booking/product/ProductResponse";

export const GET = async (req: NextRequest) => {
  const session = await getUserServerSession();
  const page = req.nextUrl.searchParams.get("page");

  const limit = req.nextUrl.searchParams.get("limit");
  const employeeId = req.nextUrl.searchParams.get("employee_id");

  const response = (
    await get<ProductResponse[]>({
      url: (() => {
        const params: string[] = [];

        if (employeeId !== null)
          params.push(`employee_id=${encodeURIComponent(employeeId)}`);

        if (page !== null) params.push(`page=${encodeURIComponent(page)}`);
        if (limit !== null) params.push(`limit=${encodeURIComponent(limit)}`);

        return `/businesses/${session.businessId}/products${params.length ? `?${params.join("&")}` : ""}`;
      })(),
    })
  ).data;

  return NextResponse.json(response);
};
