import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
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
