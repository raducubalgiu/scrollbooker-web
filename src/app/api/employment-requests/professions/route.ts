import { NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { UserBusinessType } from "@/models/UserBusiness/UserBusinessType";
import { getUserServerSession } from "@/utils/get-user-server";

export const GET = async () => {
	const { userId } = await getUserServerSession();

	const business = (
		await get<UserBusinessType>({
			url: `/users/${userId}/business`,
		})
	).data;

	const response = (
		await get({
			url: `/business-types/${business.business_type_id}/professions`,
		})
	).data;

	return NextResponse.json(response);
};
