import { NextRequest, NextResponse } from "next/server";
import { get, post, put, deleteRequest } from "@/utils/requests";
import { omit } from "lodash";

export const GET = async (req: NextRequest) => {
	const pagination = req.nextUrl.searchParams;

	const response = (
		await get({
			url: `/service-domains?${pagination}`,
		})
	).data;

	return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
	const data = await req.json();

	const response = (
		await post({
			url: `/service-domains`,
			data,
		})
	).data;

	return NextResponse.json(response);
};

export const PUT = async (req: NextRequest) => {
	const data = await req.json();

	const response = (
		await put({
			url: `/service-domains/${data.id}`,
			data: omit(data, "id"),
		})
	).data;

	return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
	const { id } = await req.json();

	const response = (
		await deleteRequest({
			url: `/service-domains/${id}`,
		})
	).data;

	return NextResponse.json(response);
};
