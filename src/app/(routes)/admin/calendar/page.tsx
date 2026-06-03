import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { WeeklyCalendar } from "@/components/modules/Admin/CalendarModule/WeeklyCalendar/WeeklyCalendar";
import { authOptions } from "@/lib/auth/authOptions";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { get } from "@/utils/requests";
import { getServerSession } from "next-auth";

async function Calendar() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Session is expired");
  }

  const { is_employee, has_employees } = session;

  if (is_employee || !has_employees) {
    const response = await get<Schedule[]>({
      url: `/users/${session?.user_id}/schedules`,
    });
    const schedules = response.data;

    if (!schedules) {
      throw new Error("Schedules are not defined");
    }

    return <WeeklyCalendar session={session} schedules={schedules} />;
  }

  return <></>;
}

export default ProtectedPage(Calendar, PermissionEnum.MY_CALENDAR_VIEW);
