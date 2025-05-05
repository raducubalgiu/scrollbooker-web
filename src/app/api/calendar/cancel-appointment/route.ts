import { NextRequest, NextResponse } from "next/server";
import { put } from "@/utils/requests";

export const PUT = async (req: NextRequest) => {
	const data = await req.json();
	const { appointmentId, message } = data;

	const response = (
		await put({
			url: `/appointments/cancel-appointment`,
			data: { appointment_id: appointmentId, message },
		})
	).data;

	return NextResponse.json(response);
};
