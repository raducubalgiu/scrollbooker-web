import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const user_id = req.nextUrl.searchParams.get("user_id");
	const start_date = req.nextUrl.searchParams.get("start_date");
	const end_date = req.nextUrl.searchParams.get("end_date");
	const all_employees = req.nextUrl.searchParams.get("all_employees");

	const response = (
		await get({
			url: `/users/${user_id}/dashboard-summary?start_date=${start_date}&end_date=${end_date}&all_employees=${all_employees}`,
		})
	).data;

	return NextResponse.json(response);
};
