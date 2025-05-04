import { NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { getUserServerSession } from "@/utils/get-user-server";

export const GET = async () => {
	const { businessTypeId } = await getUserServerSession();

	const response = (
		await get({
			url: `/business-types/${businessTypeId}/professions`,
		})
	).data;

	return NextResponse.json(response);
};
