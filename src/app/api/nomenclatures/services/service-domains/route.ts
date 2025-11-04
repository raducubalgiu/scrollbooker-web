import { NextRequest, NextResponse } from "next/server";
import { get, post, deleteRequest } from "@/utils/requests";

export const GET = async (req: NextRequest) => {
    const businessDomainId = req.nextUrl.searchParams.get("businessDomainId");

    const response = (
        await get({
            url: `/business_domains/${businessDomainId}/service-domains`,
        })
    ).data;

    return NextResponse.json(response);
};