import { NextRequest, NextResponse } from "next/server";
import { BusinessProductsResponse } from "@/ts/models/booking/product/Product";
import { get } from "@/utils/requests";

interface ProductSearchParams {
  employee_id?: string;
  product_type?: string;
  service_id?: string;
  only_services_with_products?: string;
}

type RouteContext = {
  params: Promise<{
    businessId: string;
  }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { businessId } = await context.params;
    const { searchParams } = req.nextUrl;

    const employeeId = searchParams.get("employeeId");
    const productType = searchParams.get("product_type");
    const serviceId = searchParams.get("service_id");
    const onlyServicesWithProductsParam = searchParams.get(
      "only_services_with_products"
    );
    const onlyServicesWithProducts =
      onlyServicesWithProductsParam !== null
        ? onlyServicesWithProductsParam
        : "true";

    const queryParams: ProductSearchParams = {
      only_services_with_products: onlyServicesWithProducts,
      ...(employeeId && { employee_id: employeeId }),
      ...(productType && { product_type: productType }),
      ...(serviceId && { service_id: serviceId }),
    };

    const queryString = new URLSearchParams(
      queryParams as Record<string, string>
    ).toString();

    const response = await get<BusinessProductsResponse[]>({
      url: `/businesses/${businessId}/products?${queryString}`,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching business products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
