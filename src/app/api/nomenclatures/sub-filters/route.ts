import { NextRequest, NextResponse } from "next/server";
import { get, post, put, deleteRequest } from "@/utils/requests";
import { omit } from "lodash";

export const GET = async (req: NextRequest) => {
	const params = req.nextUrl.searchParams;
	const page = params.get("page");
	const limit = params.get("limit");
	const id = params.get("id");

	const response = (
		await get({
			url: `/filters/${id}/sub-filters?page=${page}&limit=${limit}`,
		})
	).data;

	return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
	const data = await req.json();

	const response = (
		await post({
			url: `/sub-filters`,
			data: { name: data.name, filter_id: data.id },
		})
	).data;

	return NextResponse.json(response);
};

export const PUT = async (req: NextRequest) => {
	const data = await req.json();

	const response = (
		await put({
			url: `/sub-filters/${data.id}`,
			data: omit(data, "id"),
		})
	).data;

	return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
	const { id } = await req.json();

	const response = (
		await deleteRequest({
			url: `/sub-filters/${id}`,
		})
	).data;

	return NextResponse.json(response);
};
