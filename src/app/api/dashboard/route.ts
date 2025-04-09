import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { decodeToken } from "@/lib/auth/decodeToken";

export const GET = async (req: NextRequest) => {
	const { user_id } = await decodeToken();
	const filters = req.nextUrl.searchParams;
	const start_date = filters.get("start_date");
	const end_date = filters.get("end_date");

	const response = (
		await get({
			url: `/users/${user_id}/dashboard-summary?start_date=${start_date}&end_date=${end_date}`,
		})
	).data;

	return NextResponse.json(response);
};
