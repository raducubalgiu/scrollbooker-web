import { NextRequest, NextResponse } from "next/server";
import { get } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import { ServiceType } from "@/models/nomenclatures/ServiceType";

export const GET = async (req: NextRequest) => {
	const businessTypeId = req.nextUrl.searchParams.get("businessTypeId");
	const page = req.nextUrl.searchParams.get("page");
	const limit = req.nextUrl.searchParams.get("limit");

	const response = (
		await get<PaginatedData<ServiceType>>({
			url: `/business-types/${businessTypeId}/services?page=${page}&limit=${limit}`,
		})
	).data;

	return NextResponse.json(response);
};
