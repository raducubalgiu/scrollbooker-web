import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import CalendarModule from "@/components/modules/CalendarModule/CalendarModule";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { CalendarEventsProvider } from "@/providers/CalendarEventsProvider";

async function Calendar() {
	return (
		<CalendarEventsProvider>
			<CalendarModule />
		</CalendarEventsProvider>
	);
}

export default ProtectedPage(Calendar, PermissionEnum.MY_CALENDAR_VIEW);
