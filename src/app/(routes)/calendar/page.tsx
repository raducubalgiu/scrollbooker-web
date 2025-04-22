import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import CalendarModule from "@/components/modules/CalendarModule/CalendarModule";
import React from "react";

async function Calendar() {
	return <CalendarModule />;
}

export default ProtectedPage(Calendar, "CALENDAR_VIEW");
