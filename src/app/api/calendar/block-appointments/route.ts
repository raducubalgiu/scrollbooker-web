import { NextRequest, NextResponse } from "next/server";
import { post } from "@/utils/requests";

export const POST = async (req: NextRequest) => {
	const data = await req.json();

	const response = (
		await post({
			url: `/appointments/block-appointments`,
			data,
		})
	).data;

	return NextResponse.json(response);
};
