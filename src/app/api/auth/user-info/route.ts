import { NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async () => {
	const response = (
		await get({
			url: `/auth/user-info`,
		})
	).data;

	return NextResponse.json(response);
};
