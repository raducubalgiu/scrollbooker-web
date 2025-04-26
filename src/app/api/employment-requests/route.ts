import { NextRequest, NextResponse } from "next/server";
import { get, post } from "@/utils/requests";
import { decodeToken } from "@/lib/auth/decodeToken";

export const GET = async () => {
	const { user_id } = await decodeToken();

	const response = (
		await get({
			url: `/users/${user_id}/employment-requests`,
		})
	).data;

	return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
	const data = await req.json();

	const response = (
		await post({
			url: `/employment-requests`,
			data,
		})
	).data;

	return NextResponse.json(response);
};
