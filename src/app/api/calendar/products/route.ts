import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { decodeToken } from "@/lib/auth/decodeToken";
import { ProductType } from "@/models/Product/ProductResponse";

export const GET = async (req: NextRequest) => {
	const { user_id } = await decodeToken();
	const serviceId = req.nextUrl.searchParams.get("serviceId");

	const response = (
		await get<ProductType[]>({
			url: `/users/${user_id}/services/${serviceId}/products`,
		})
	).data;

	return NextResponse.json(response);
};
