import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest } from "@/utils/requests";
import { decodeToken } from "@/lib/auth/decodeToken";

export const GET = async (req: NextRequest) => {
	const { user_id } = await decodeToken();
	const pagination = req.nextUrl.searchParams;

	const response = (
		await get({
			url: `/users/${user_id}/products?${pagination}`,
		})
	).data;

	return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
	const data = await req.json();

	const { product, sub_filters } = Object.entries(data).reduce(
		(acc, [key, value]) => {
			if (key.startsWith("filter_")) {
				acc.sub_filters.push(value);
			} else {
				acc.product[key] = value;
			}
			return acc;
		},
		{ product: {} as Record<string, unknown>, sub_filters: [] as number[] }
	);

	const response = (
		await post({
			url: `/products`,
			data: {
				product,
				sub_filters,
			},
		})
	).data;

	return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
	const { id } = await req.json();

	const response = (
		await deleteRequest({
			url: `/products/${id}`,
		})
	).data;

	return NextResponse.json(response);
};
