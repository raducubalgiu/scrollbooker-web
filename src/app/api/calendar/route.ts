import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { getUserServerSession } from "@/lib/auth/get-user-server";

export const GET = async (req: NextRequest) => {
	const { userId } = await getUserServerSession();
	const startDate = req.nextUrl.searchParams.get("startDate");
	const endDate = req.nextUrl.searchParams.get("endDate");
	const slotDuration = req.nextUrl.searchParams.get("slotDuration");

	const response = (
		await get({
			url: `/appointments/calendar-events?start_date=${startDate}&end_date=${endDate}&user_id=${userId}&slot_duration=${slotDuration}`,
		})
	).data;

	return NextResponse.json(response);
};
