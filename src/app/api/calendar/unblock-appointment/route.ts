import { post } from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	const data = await req.json();

	const response = (
		await post({
			url: `/appointments/unblock-appointment`,
			data: { start_date: data.startDate, end_date: data.endDate },
		})
	).data;

	return NextResponse.json(response);
};
