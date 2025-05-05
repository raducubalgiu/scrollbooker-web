import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const userId = req.nextUrl.searchParams.get("userId");
	const startDate = req.nextUrl.searchParams.get("startDate");
	const endDate = req.nextUrl.searchParams.get("endDate");
	const allEmployees = req.nextUrl.searchParams.get("allEmployees");

	const response = (
		await get({
			url: `/users/${userId}/dashboard-summary?start_date=${startDate}&end_date=${endDate}&all_employees=${allEmployees}`,
		})
	).data;

	return NextResponse.json(response);
};
