import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const pagination = req.nextUrl.searchParams;

	const response = (
		await get({
			url: `/service-domains/with-services?${pagination}`,
		})
	).data;

	return NextResponse.json(response);
};
