import React from "react";
import { get } from "@/utils/requests";
import { ScheduleResponseType } from "@/ts/models/Schedules/ScheduleType";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import MySchedulesModule from "@/components/modules/MyBusiness/MySchedulesModule/MySchedulesModule";

async function Schedules() {
  const { userId } = await getUserServerSession();

  const response = (
    await get<ScheduleResponseType[]>({
      url: `/users/${userId}/schedules`,
    })
  ).data;

  return <MySchedulesModule data={response} />;
}

export default ProtectedPage(Schedules, PermissionEnum.MY_SCHEDULES_VIEW);
