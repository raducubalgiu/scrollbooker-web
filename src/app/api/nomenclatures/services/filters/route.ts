import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
    const serviceId = req.nextUrl.searchParams.get("serviceId");
    const filterId = req.nextUrl.searchParams.get("filterId");

    const response = (
        await get({
            url: `/services/${serviceId}/filters/${filterId}`,
        })
    ).data;

    return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
    const data = await req.json();
    const { serviceId, filterId } = data;

    const response = (
        await post({
            url: `/services/${serviceId}/filters/${filterId}`,
            data: {},
        })
    ).data;

    return NextResponse.json(response);
};

export const DELETE = async (req: NextRequest) => {
    const data = await req.json();
    const { serviceId, filterId } = data;

    const response = (
        await deleteRequest({
            url: `/services/${serviceId}/filters/${filterId}`,
        })
    ).data;

    return NextResponse.json(response);
};
