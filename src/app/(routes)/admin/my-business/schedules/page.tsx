import React, { JSX } from "react";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import MySchedulesModule from "@/components/modules/Admin/MyBusinessModule/MySchedulesModule/MySchedulesModule";
import { getSchedulesByUserId } from "@/controllers/booking/schedule.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

async function Schedules(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (!session?.user_id) {
    throw new Error(
      "Sesiune invalidă sau expirată: Identificatorul utilizatorului (user_id) lipsește."
    );
  }

  const schedulesData = await getSchedulesByUserId(session.user_id);

  return <MySchedulesModule data={schedulesData} />;
}

export default ProtectedPage(Schedules, PermissionEnum.MY_SCHEDULES_VIEW);
