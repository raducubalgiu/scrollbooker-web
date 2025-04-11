import { NextRequest, NextResponse } from "next/server";
import { deleteRequest } from "@/utils/requests";

export const DELETE = async (req: NextRequest) => {
	const data = await req.json();
	const { businessId, serviceId } = data;

	const response = (
		await deleteRequest({
			url: `/businesses/${businessId}/services/${serviceId}`,
		})
	).data;

	return NextResponse.json(response);
};
