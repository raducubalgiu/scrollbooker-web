import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const professionId = req.nextUrl.searchParams.get("professionId");

	const response = (
		await get({
			url: `/professions/${professionId}/business-types`,
		})
	).data;

	return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
	const data = await req.json();
	const { professionId, businessTypeId } = data;

	const response = (
		await post({
			url: `/professions/${professionId}/business-types/${businessTypeId}`,
			data: {},
		})
	).data;

	return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
	const data = await req.json();
	const { professionId, businessTypeId } = data;

	const response = (
		await deleteRequest({
			url: `/professions/${professionId}/business-types/${businessTypeId}`,
		})
	).data;

	return NextResponse.json(response);
};
