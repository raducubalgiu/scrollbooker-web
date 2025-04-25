import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const search = req.nextUrl.searchParams.get("search");

	const response = (
		await get({
			url: `/users/search?q=${search}`,
		})
	).data;

	return NextResponse.json(response);
};
