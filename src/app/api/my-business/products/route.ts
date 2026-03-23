import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { ProductResponse } from "@/ts/models/booking/product/Product";

export const GET = async (req: NextRequest) => {
  const session = await getUserServerSession();
  const page = req.nextUrl.searchParams.get("page");

  const limit = req.nextUrl.searchParams.get("limit");
  const serviceDomainId = req.nextUrl.searchParams.get("service_domain_id");
  const serviceId = req.nextUrl.searchParams.get("service_id");
  const employeeId = req.nextUrl.searchParams.get("employee_id");
  const productType = req.nextUrl.searchParams.get("product_type");

  const response = (
    await get<ProductResponse>({
      url: (() => {
        const params: string[] = [];

        if (serviceId !== null)
          params.push(`service_id=${encodeURIComponent(serviceId)}`);

        if (serviceDomainId !== null)
          params.push(
            `service_domain_id=${encodeURIComponent(serviceDomainId)}`
          );

        if (employeeId !== null)
          params.push(`employee_id=${encodeURIComponent(employeeId)}`);

        if (productType !== null)
          params.push(`product_type=${encodeURIComponent(productType)}`);

        if (page !== null) params.push(`page=${encodeURIComponent(page)}`);
        if (limit !== null) params.push(`limit=${encodeURIComponent(limit)}`);

        return `/businesses/${session.businessId}/products${params.length ? `?${params.join("&")}` : ""}`;
      })(),
    })
  ).data;

  return NextResponse.json(response);
};
