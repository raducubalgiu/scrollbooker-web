import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { CalendarScreen } from "@/components/modules/Admin/MyBusinessModule/MyCalendarModule/v2/CalendarScreen";
import { authOptions } from "@/lib/auth/authOptions";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { getServerSession } from "next-auth";
import { JSX } from "react";

async function Calendar(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Session is expired");
  }

  return <CalendarScreen session={session} />;
}

export default ProtectedPage(Calendar, PermissionEnum.MY_CALENDAR_VIEW);
