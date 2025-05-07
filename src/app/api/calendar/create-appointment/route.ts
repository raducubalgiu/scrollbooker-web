import { NextRequest, NextResponse } from "next/server";
import { post } from "@/utils/requests";

export const POST = async (req: NextRequest) => {
	const data = await req.json();

	const response = (
		await post({
			url: `/appointments/create-own-client`,
			data,
		})
	).data;

	return NextResponse.json(response);
};
