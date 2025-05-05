import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const userId = req.nextUrl.searchParams.get("userId");
	const month = req.nextUrl.searchParams.get("month");

	const response = (
		await get({
			url: `/appointments/calendar-available-days?month=${month}&user_id=${userId}`,
		})
	).data;

	return NextResponse.json(response);
};
