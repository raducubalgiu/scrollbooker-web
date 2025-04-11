import { NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async () => {
	const response = (
		await get({
			url: `/business-domains`,
		})
	).data;

	return NextResponse.json(response);
};
