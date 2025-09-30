import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { ProductType } from "@/ts/models/Product/ProductResponse";
import { getUserServerSession } from "@/lib/auth/get-user-server";

export const GET = async (req: NextRequest) => {
	const { userId } = await getUserServerSession();
	const serviceId = req.nextUrl.searchParams.get("serviceId");

	const response = (
		await get<ProductType[]>({
			url: `/users/${userId}/services/${serviceId}/products`,
		})
	).data;

	return NextResponse.json(response);
};
