import { NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { ProductType } from "@/ts/models/Product/ProductResponse";
import { getUserServerSession } from "@/lib/auth/get-user-server";

export const GET = async () => {
	const { userId } = await getUserServerSession();

	const response = (
		await get<ProductType[]>({
			url: `/users/${userId}/currencies`,
		})
	).data;

	return NextResponse.json(response);
};
