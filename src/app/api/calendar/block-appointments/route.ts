import { NextRequest, NextResponse } from "next/server";
import { post } from "@/utils/requests";
import { decodeToken } from "@/lib/auth/decodeToken";

export const POST = async (req: NextRequest) => {
	const data = await req.json();
	const { user_id } = await decodeToken();

	const finalData = data.map(d => {
		return {
			start_date: d.start_date,
			end_date: d.end_date,
			block_message: d.block_message,
			user_id,
		};
	});

	const response = (
		await post({
			url: `/appointments/block-appointments`,
			data: finalData,
		})
	).data;

	return NextResponse.json(response);
};
