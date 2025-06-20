import { getUserServerSession } from "@/lib/auth/get-user-server";
import { get } from "@/utils/requests";
import { NextResponse } from "next/server";

export const GET = async () => {
    const { userId } = await getUserServerSession()

    console.log('USER ID!!!!', userId)

    const response = (
        await get({
            url: `/users/${userId}/user-profile`,
        })
    ).data;

    console.log('RESPONSE!!!', response)

    return NextResponse.json(response);
};
