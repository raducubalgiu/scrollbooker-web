import { NextRequest, NextResponse } from "next/server";
import { get, post, put } from "@/utils/requests";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { CurrencyType } from "@/models/nomenclatures/CurrencyType";

export const GET = async () => {
	const { userId } = await getUserServerSession();

	const response = (
		await get<CurrencyType[]>({
			url: `/users/${userId}/currencies?`,
		})
	).data;

	return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
	const { userId } = await getUserServerSession();
	const data = await req.json();

	const response = (
		await post({
			url: `/user-currencies`,
			data: { user_id: userId, currency_id: data.currencyId },
		})
	).data;

	return NextResponse.json(response);
};

export const PUT = async (req: NextRequest) => {
	const { userId } = await getUserServerSession();
	const data = await req.json();

	const response = (
		await put({
			url: `/user-currencies`,
			data: { user_id: userId, currency_id: data.currencyId },
		})
	).data;

	return NextResponse.json(response);
};
