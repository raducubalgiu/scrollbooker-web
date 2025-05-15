import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const serviceId = req.nextUrl.searchParams.get("serviceId");

	const response = (
		await get({
			url: `/services/${serviceId}/business-types`,
		})
	).data;

	return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
	const data = await req.json();
	const { serviceId, businessTypeId } = data;

	const response = (
		await post({
			url: `/services/${serviceId}/business-types/${businessTypeId}`,
			data: {},
		})
	).data;

	return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
	const data = await req.json();
	const { serviceId, businessTypeId } = data;

	const response = (
		await deleteRequest({
			url: `/services/${serviceId}/business-types/${businessTypeId}`,
		})
	).data;

	return NextResponse.json(response);
};
