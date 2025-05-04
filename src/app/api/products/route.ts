import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest, put } from "@/utils/requests";
import { omit } from "lodash";
import { getUserServerSession } from "@/utils/get-user-server";

export const GET = async (req: NextRequest) => {
	const { userId } = await getUserServerSession();
	const pagination = req.nextUrl.searchParams;

	const response = (
		await get({
			url: `/users/${userId}/products?${pagination}`,
		})
	).data;

	return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
	const data = await req.json();

	const { product, sub_filters } = Object.entries(data).reduce(
		(acc, [key, value]) => {
			if (key.startsWith("filter_")) {
				acc.sub_filters.push(value as number);
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

export const PUT = async (req: NextRequest) => {
	const data = await req.json();

	const response = (
		await put({
			url: `/products/${data.id}`,
			data: omit(data, "id"),
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
