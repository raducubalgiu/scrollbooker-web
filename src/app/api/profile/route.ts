import { getUserServerSession } from "@/lib/auth/get-user-server";
import { get } from "@/utils/requests";
import { NextResponse } from "next/server";

export const GET = async () => {
    const { userId } = await getUserServerSession()

    const response = (
        await get({
            url: `/users/${userId}/user-profile`,
        })
    ).data;

    return NextResponse.json(response);
};
