import { NextRequest, NextResponse } from "next/server";
import { post } from "@/utils/requests";

type BlockUpdateData = {
	startDate: string;
	endDate: string;
	userId: number;
	message: string;
}[];

export const POST = async (req: NextRequest) => {
	const data: BlockUpdateData = await req.json();

	const updater = data.map(slot => {
		return {
			start_date: slot.startDate,
			end_date: slot.endDate,
			message: slot.message,
			user_id: slot.userId,
		};
	});

	const response = (
		await post({
			url: `/appointments/block-appointments`,
			data: updater,
		})
	).data;

	return NextResponse.json(response);
};
