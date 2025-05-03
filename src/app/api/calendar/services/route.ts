import { NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { decodeToken } from "@/lib/auth/decodeToken";

export const GET = async () => {
	const { user_id } = await decodeToken();

	const response = (
		await get<ServiceType[]>({
			url: `/users/${user_id}/services`,
		})
	).data;

	return NextResponse.json(response);
};
