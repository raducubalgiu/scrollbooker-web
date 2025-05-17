import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const filterId = req.nextUrl.searchParams.get("filterId");

	const response = (
		await get({
			url: `/filters/${filterId}/business-types`,
		})
	).data;

	return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
	const data = await req.json();
	const { filterId, businessTypeId } = data;

	const response = (
		await post({
			url: `/filters/${filterId}/business-types/${businessTypeId}`,
			data: {},
		})
	).data;

	return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
	const data = await req.json();
	const { filterId, businessTypeId } = data;

	const response = (
		await deleteRequest({
			url: `/filters/${filterId}/business-types/${businessTypeId}`,
		})
	).data;

	return NextResponse.json(response);
};
