"use client";

import { Fragment, useEffect } from "react";
import { useCustomQuery } from "@/hooks/useHttp";
import CalendarEvents from "@/components/cutomized/CalendarEvents/CalendarEvents";
import { Dialog } from "@mui/material";
import { useCalendarEventsContext } from "@/providers/CalendarEventsProvider";
import { CalendarEventsType } from "@/ts/models/Calendar/CalendarEventsType";

export default function CalendarModule() {
	const {
		calendar,
		fullScreen,
		startDate,
		endDate,
		slotDuration,
		setCalendar,
	} = useCalendarEventsContext();

	const { data, isLoading: isLoadingCalendar } = useCustomQuery<CalendarEventsType>({
		key: ["calendar", startDate, endDate, slotDuration],
		url: "/api/calendar",
		params: {
			startDate,
			endDate,
			slotDuration,
		},
	});

	useEffect(() => {
		setCalendar(data);
	}, [data, setCalendar]);

	const durations = [
		{ value: 15, label: "15 minute" },
		{ value: 30, label: "30 de minute" },
		{ value: 45, label: "45 de minute" },
		{ value: 60, label: "1 oră" },
		{ value: 75, label: "1 oră și 15 minute" },
		{ value: 90, label: "1 oră și 30 de minute" },
		{ value: 105, label: "1 oră și 45 de minute" },
		{ value: 120, label: "2 ore" },
		{ value: 135, label: "2 ore si 15 minute" },
		{ value: 150, label: "2 ore si 30 de minute" },
		{ value: 165, label: "2 ore si 45 de minute" },
		{ value: 180, label: "3 ore" },
	];

	const displayCalendar = (
		<CalendarEvents
			fullScreen={fullScreen}
			calendar={calendar}
			durationOptions={durations}
			minSlotTime={calendar?.min_slot_time}
			maxSlotTime={calendar?.max_slot_time}
			isLoading={isLoadingCalendar}
		/>
	);

	return (
		<Fragment>
			{fullScreen ? (
				<Dialog fullScreen open={fullScreen}>
					{displayCalendar}
				</Dialog>
			) : (
				displayCalendar
			)}
		</Fragment>
	);
}
