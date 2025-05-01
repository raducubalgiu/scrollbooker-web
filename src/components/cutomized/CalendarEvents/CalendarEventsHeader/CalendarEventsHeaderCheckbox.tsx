import React, { ChangeEvent, useState } from "react";
import { Checkbox } from "@mui/material";
import { DayInfo } from "../calendar-utils/calendar-types";
import {
	BlockedDayActionEnum,
	useCalendarEventsContext,
} from "@/providers/CalendarEventsProvider";

type CalendarEventsHeaderCheckboxProps = {
	day: DayInfo;
	dayIndex: number;
};

export default function CalendarEventsHeaderCheckbox({
	day,
	dayIndex,
}: CalendarEventsHeaderCheckboxProps) {
	const { blockedDaysSlots, handleBlockedDaysSlots } =
		useCalendarEventsContext();

	const [isBlockedDay, setIsBlockedDay] = useState(
		blockedDaysSlots[dayIndex]?.slots.length === day?.slots.length
	);

	const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			handleBlockedDaysSlots(
				{ day: day.date, slots: day.slots },
				BlockedDayActionEnum.ADD
			);
		} else {
			handleBlockedDaysSlots(
				{ day: day.date, slots: day.slots },
				BlockedDayActionEnum.REMOVE
			);
		}

		setIsBlockedDay(e.target.checked);
	};

	return (
		<Checkbox
			checked={isBlockedDay}
			onChange={handleCheckbox}
			color="default"
		/>
	);
}
