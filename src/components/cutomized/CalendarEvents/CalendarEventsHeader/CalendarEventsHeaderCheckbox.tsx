import { useState } from "react";
import { DayInfo } from "../calendar-utils/calendar-types";
import { Checkbox, Tooltip } from "@mui/material";

type CalendarEventsHeaderCheckboxProps = {
	day: DayInfo;
};

export default function CalendarEventsHeaderCheckbox({
	day,
}: CalendarEventsHeaderCheckboxProps) {
	const [isBlockedDay, setIsBlockedDay] = useState(day.is_blocked);

	return (
		<Tooltip title="Blochează sloturile acestei zi">
			<Checkbox
				checked={isBlockedDay}
				onChange={e => setIsBlockedDay(e.target.checked)}
				color="default"
			/>
		</Tooltip>
	);
}
