"use client";

import { Fragment } from "react";
import { useCustomQuery } from "@/hooks/useHttp";
import CalendarEvents from "@/components/cutomized/CalendarEvents/CalendarEvents";
import { CalendarType } from "@/components/cutomized/CalendarEvents/calendar-utils/calendar-types";
import { Dialog } from "@mui/material";
import { formatMinutesLabel } from "@/utils/formatMinutesLabel";
import { useCalendarEventsContext } from "@/providers/CalendarEventsProvider";

export default function CalendarModule() {
	const { fullScreen, startDate, endDate, slotDuration } =
		useCalendarEventsContext();

	const { data: durations, isLoading: isLoadingDurations } = useCustomQuery<
		number[]
	>({
		key: ["durations"],
		url: "/api/calendar/durations",
	});

	const { data: calendar, isLoading: isLoadingCalendar } =
		useCustomQuery<CalendarType>({
			key: ["calendar", startDate, endDate, slotDuration],
			url: "/api/calendar",
			params: {
				startDate,
				endDate,
				userId: 55,
				slotDuration,
			},
			options: { enabled: !!durations && !!slotDuration },
		});

	const durationOptions = durations?.map(dur => {
		return {
			value: dur,
			label: formatMinutesLabel(dur),
		};
	});

	const displayCalendar = (
		<CalendarEvents
			fullScreen={fullScreen}
			calendar={calendar}
			durationOptions={durationOptions ?? []}
			minSlotTime={calendar?.min_slot_time}
			maxSlotTime={calendar?.max_slot_time}
			isLoading={isLoadingDurations || isLoadingCalendar}
		/>
	);

	return (
		<Fragment>
			{fullScreen && (
				<Dialog fullScreen open={fullScreen}>
					{displayCalendar}
				</Dialog>
			)}
			{!fullScreen && displayCalendar}
		</Fragment>
	);
}
