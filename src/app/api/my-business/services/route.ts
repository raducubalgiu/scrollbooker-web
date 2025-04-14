import { NextRequest, NextResponse } from "next/server";
import { deleteRequest, post } from "@/utils/requests";

export const POST = async (req: NextRequest) => {
	const data = await req.json();
	const { businessId, servicesIds } = data;

	const response = (
		await post({
			url: `/businesses/${businessId}/services`,
			data: { service_ids: servicesIds },
		})
	).data;

	return NextResponse.json(response);
};

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
