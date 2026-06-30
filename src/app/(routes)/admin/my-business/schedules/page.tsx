import React, { JSX } from "react";
import { get } from "@/utils/requests";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import MySchedulesModule from "@/components/modules/Admin/MyBusiness/MySchedulesModule/MySchedulesModule";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

async function Schedules(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (!session?.user_id) {
    throw new Error(
      "Sesiune invalidă sau expirată: Identificatorul utilizatorului (user_id) lipsește."
    );
  }

  const response = await get<Schedule[]>({
    url: `/users/${session.user_id}/schedules`,
  });

  const schedulesData = response?.data;

  if (!schedulesData) {
    throw new Error("An error occured when fetching schedules");
  }

  return <MySchedulesModule data={schedulesData} />;
}

export default ProtectedPage(Schedules, PermissionEnum.MY_SCHEDULES_VIEW);
