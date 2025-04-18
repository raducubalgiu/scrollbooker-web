import { NextRequest, NextResponse } from "next/server";
import { get, post } from "@/utils/requests";
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

	const response = (
		await post({
			url: `/products`,
			data,
		})
	).data;

	return NextResponse.json(response);
};
