import React from "react";
import { get } from "@/utils/requests";
import { ScheduleResponseType } from "@/ts/models/booking/schedule/ScheduleType";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import MySchedulesModule from "@/components/modules/Admin/MyBusiness/MySchedulesModule/MySchedulesModule";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { Paper } from "@mui/material";

async function Schedules() {
  const { userId } = await getUserServerSession();

  const response = (
    await get<ScheduleResponseType[]>({
      url: `/users/${userId}/schedules`,
    })
  ).data;

  return (
    <MainLayout title="Programul de lucru" hideAction>
      <Paper>
        <MySchedulesModule data={response} />
      </Paper>
    </MainLayout>
  );
}

export default ProtectedPage(Schedules, PermissionEnum.MY_SCHEDULES_VIEW);
