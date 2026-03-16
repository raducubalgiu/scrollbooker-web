import React from "react";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import LocationTabsClient from "@/components/modules/MyBusiness/LocationModule/MyLocationModule";
import { ScheduleResponseType } from "@/ts/models/booking/schedule/ScheduleType";
import { get } from "@/utils/requests";
import MyLocationModule from "@/components/modules/MyBusiness/LocationModule/MyLocationModule";

async function MyBusiness() {
  const { userId } = await getUserServerSession();

  const response = (
    await get<ScheduleResponseType[]>({
      url: `/users/${userId}/schedules`,
    })
  ).data;

  return (
    <MainLayout title="Detalii locatie" hideAction>
      <MyLocationModule schedules={response} />
    </MainLayout>
  );
}

export default ProtectedPage(
  MyBusiness,
  PermissionEnum.MY_BUSINESS_LOCATION_VIEW
);
