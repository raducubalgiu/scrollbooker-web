import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { UserInfoType } from "@/models/UserInfoType";

export const GET = async (req: NextRequest) => {
	const paginate = req.nextUrl.searchParams;

	const user = (
		await get<UserInfoType>({
			url: `/auth/user-info`,
		})
	).data;

	if (!user) return NextResponse.json(null);

	const response = (
		await get({
			url: `/businesses/${user.business_id}/employees?${paginate}`,
		})
	).data;

	return NextResponse.json(response);
};
