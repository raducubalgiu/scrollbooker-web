import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { WeeklyCalendar } from "@/components/modules/Admin/CalendarModule/CalendarModule";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

async function Calendar() {
  return <WeeklyCalendar />;
}

export default ProtectedPage(Calendar, PermissionEnum.MY_CALENDAR_VIEW);
