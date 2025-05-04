import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { getUserServerSession } from "@/utils/get-user-server";

export const GET = async (req: NextRequest) => {
	const { businessId } = await getUserServerSession();
	const paginate = req.nextUrl.searchParams;

	const response = (
		await get({
			url: `/businesses/${businessId}/employees?${paginate}`,
		})
	).data;

	return NextResponse.json(response);
};
