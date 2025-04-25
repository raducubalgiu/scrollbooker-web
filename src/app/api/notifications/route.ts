import { NextRequest, NextResponse } from "next/server";
import { get, deleteRequest } from "@/utils/requests";
import { decodeToken } from "@/lib/auth/decodeToken";

export const GET = async (req: NextRequest) => {
	const { user_id } = await decodeToken();
	const pagination = req.nextUrl.searchParams;

	const response = (
		await get({
			url: `/users/${user_id}/notifications?${pagination}`,
		})
	).data;

	return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
	const { id } = await req.json();

	const response = (
		await deleteRequest({
			url: `/notifications/${id}`,
		})
	).data;

	return NextResponse.json(response);
};
