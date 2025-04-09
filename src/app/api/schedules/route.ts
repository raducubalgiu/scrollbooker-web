import { NextResponse, NextRequest } from "next/server";
import { put } from "@/utils/requests";

export const PUT = async (req: NextRequest) => {
	const data = await req.json();

	const response = (
		await put({
			url: "/schedules",
			data,
		})
	).data;

	return NextResponse.json(response);
};
