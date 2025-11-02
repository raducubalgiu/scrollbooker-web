import { NextRequest, NextResponse } from "next/server";
import { get, post } from "@/utils/requests";
import { UnapprovedResponse } from "@/ts/models/Business/UnapprovedBusinessResponse";

export const GET = async (req: NextRequest) => {
    const pagination = req.nextUrl.searchParams;

    const response = (
        await get<UnapprovedResponse>({
            url: `/businesses/unapproved-businesses?${pagination}`,
        })
    ).data;

    return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
    const data = await req.json();

    const response = (
        await post({
            url: `/users/${data.userId}/approve`,
            data: {},
        })
    ).data;

    return NextResponse.json(response);
};