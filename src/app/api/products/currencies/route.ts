import { NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { getUserServerSession } from "@/utils/get-user-server";

export const GET = async () => {
	const { userId } = await getUserServerSession();

	const response = (
		await get({
			url: `/users/${userId}/currencies`,
		})
	).data;

	return NextResponse.json(response);
};
