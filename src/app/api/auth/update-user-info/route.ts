import { NextRequest, NextResponse } from "next/server";
import { put } from "@/utils/requests";

export const PUT = async (req: NextRequest) => {
	const data = await req.json();

	const response = (
		await put({
			url: "auth/update-user-info",
			data,
		})
	).data;

	return NextResponse.json(response);
};
