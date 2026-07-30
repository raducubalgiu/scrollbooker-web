import { NextRequest, NextResponse } from "next/server";
import { get, deleteRequest } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
	const pagination = req.nextUrl.searchParams;

	const response = (
		await get({
			url: `/notifications?${pagination}`,
		})
	).data;

	return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
	const { id } = await req.json();

	const response = (
		await deleteRequest({
			url: `/notifications/${id}`,
		})
	).data;

	return NextResponse.json(response);
};
