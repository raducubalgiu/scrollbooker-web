import { NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { decodeToken } from "@/lib/auth/decodeToken";
import { UserBusinessType } from "@/models/UserBusiness/UserBusinessType";

export const GET = async () => {
	const { user_id } = await decodeToken();

	const business = (
		await get<UserBusinessType>({
			url: `/users/${user_id}/business`,
		})
	).data;

	const response = (
		await get({
			url: `/business-types/${business.business_type_id}/professions`,
		})
	).data;

	return NextResponse.json(response);
};
