import { NextResponse } from "next/server";
import { get } from "@/utils/requests";

export const GET = async () => {
	const response = (
		await get({
			url: `/users/56/available-professions`,
		})
	).data;

	return NextResponse.json(response);
};
