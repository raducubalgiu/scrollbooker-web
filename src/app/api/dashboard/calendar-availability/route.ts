import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const userId = req.nextUrl.searchParams.get("userId");
	const startDate = req.nextUrl.searchParams.get("startDate");
	const endDate = req.nextUrl.searchParams.get("endDate");
	const slotDuration = req.nextUrl.searchParams.get("slotDuration");

	const response = (
		await get({
			url: `/appointments/calendar-timeslots?start_date=${startDate}&end_date=${endDate}&user_id=${userId}&slot_duration=${slotDuration}`,
		})
	).data;

	return NextResponse.json(response);
};
