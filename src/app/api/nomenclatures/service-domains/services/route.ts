import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const params = req.nextUrl.searchParams;
	const page = params.get("page");
	const limit = params.get("limit");
	const id = params.get("id");

	const response = (
		await get({
			url: `/service-domains/${id}/services?page=${page}&limit=${limit}`,
		})
	).data;

	return NextResponse.json(response);
};
