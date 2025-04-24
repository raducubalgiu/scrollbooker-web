import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const consentName = req.nextUrl.searchParams.get("consentName");

	const response = (
		await get({
			url: `/consents/${consentName}`,
		})
	).data;

	return NextResponse.json(response);
};
