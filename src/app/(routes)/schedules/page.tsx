import SchedulesModule from "@/components/modules/SchedulesModule/SchedulesModule";
import React from "react";
import { decodeToken } from "@/lib/auth/decodeToken";
import { get } from "@/utils/requests";
import { ScheduleResponseType } from "@/models/ScheduleType";

export default async function Schedules() {
	const { user_id } = await decodeToken();

	const response = (
		await get({
			url: `/users/${user_id}/schedules`,
		})
	).data;

	return <SchedulesModule data={response as ScheduleResponseType[]} />;
}
