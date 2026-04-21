import { NextRequest, NextResponse } from "next/server";
import { BusinessProductsResponse } from "@/ts/models/booking/product/Product";
import { get } from "@/utils/requests";

type RouteContext = {
  params: Promise<{
    businessId: string;
  }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  const { businessId } = await context.params;

  const searchParams = req.nextUrl.searchParams;
  const employeeId = searchParams.get("employeeId");

  const params = new URLSearchParams({
    only_services_with_products: "true",
  });

  if (employeeId) {
    params.append("employeeId", employeeId);
  }

  const response = (
    await get<BusinessProductsResponse[]>({
      url: `/businesses/${businessId}/products?${params.toString()}`,
    })
  ).data;

  return NextResponse.json(response);
}
