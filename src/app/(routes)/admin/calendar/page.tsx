import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { WeeklyCalendar } from "@/components/modules/Admin/CalendarModule/WeeklyCalendar";
import { authOptions } from "@/lib/auth/authOptions";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { getServerSession } from "next-auth";

async function Calendar() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Session is expired");
  }

  const { is_employee, has_employees } = session;

  if (is_employee || !has_employees) {
    return <WeeklyCalendar session={session} />;
  }

  return <></>;
}

export default ProtectedPage(Calendar, PermissionEnum.MY_CALENDAR_VIEW);
