import { NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { decodeToken } from "@/lib/auth/decodeToken";

export const GET = async () => {
	const { user_id } = await decodeToken();

	const response = (
		await get({
			url: `/users/${user_id}/currencies`,
		})
	).data;

	return NextResponse.json(response);
};
