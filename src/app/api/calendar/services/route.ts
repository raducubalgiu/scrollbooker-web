import { NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { getUserServerSession } from "@/utils/get-user-server";

export const GET = async () => {
	const { userId } = await getUserServerSession();

	const response = (
		await get<ServiceType[]>({
			url: `/users/${userId}/services`,
		})
	).data;

	return NextResponse.json(response);
};
