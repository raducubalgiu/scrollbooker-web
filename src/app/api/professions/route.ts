import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const userId = req.nextUrl.searchParams.get("userId");

	const response = (
		await get({
			url: `/users/${userId}/available-professions`,
		})
	).data;

	return NextResponse.json(response);
};
