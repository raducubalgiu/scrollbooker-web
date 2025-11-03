import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const userId = req.nextUrl.searchParams.get("userId");
	const startDate = req.nextUrl.searchParams.get("startDate");
	const endDate = req.nextUrl.searchParams.get("endDate");

	const response = (
		await get({
			url: `/appointments/calendar-available-days?user_id=${userId}&start_date=${startDate}&end_date=${endDate}`,
		})
	).data;

	return NextResponse.json(response);
};
