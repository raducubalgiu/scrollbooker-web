import { NextRequest, NextResponse } from "next/server";
import { post, deleteRequest } from "@/utils/requests";

export const POST = async (req: NextRequest) => {
	const { permissionId, roleId } = await req.json();

	const response = (
		await post({
			url: `/permissions/${permissionId}/roles/${roleId}`,
			data: {},
		})
	).data;

	return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
	const { permissionId, roleId } = await req.json();

	const response = (
		await deleteRequest({
			url: `/permissions/${permissionId}/roles/${roleId}`,
		})
	).data;

	return NextResponse.json(response);
};
