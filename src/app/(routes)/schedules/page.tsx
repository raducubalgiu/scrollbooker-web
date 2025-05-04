import SchedulesModule from "@/components/modules/SchedulesModule/SchedulesModule";
import React from "react";
import { get } from "@/utils/requests";
import { ScheduleResponseType } from "@/models/ScheduleType";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { getUserServerSession } from "@/utils/get-user-server";

async function Schedules() {
	const { userId } = await getUserServerSession();

	const response = (
		await get<ScheduleResponseType[]>({
			url: `/users/${userId}/schedules`,
		})
	).data;

	return <SchedulesModule data={response} />;
}

export default ProtectedPage(Schedules, "SCHEDULES_VIEW");
