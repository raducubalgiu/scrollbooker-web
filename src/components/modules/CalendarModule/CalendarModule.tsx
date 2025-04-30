"use client";

import { useCallback } from "react";
import { useCustomQuery } from "@/hooks/useHttp";
import CalendarEvents from "@/components/cutomized/CalendarEvents/CalendarEvents";
import { CalendarType } from "@/components/cutomized/CalendarEvents/calendar-utils/calendar-types";
import dayjs from "dayjs";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { formatMinutesLabel } from "@/utils/formatMinutesLabel";

const DEFAULT_START_DATE = dayjs().startOf("week").format("YYYY-MM-DD");
const DEFAULT_END_DATE = dayjs().endOf("week").format("YYYY-MM-DD");

export default function CalendarModule() {
	const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
	const [endDate, setEndDate] = useState(DEFAULT_END_DATE);
	const [slotDuration, setSlotDuration] = useState(60);

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
			options: { enabled: !!durations },
		});

	const handlePreviousWeek = useCallback(() => {
		const newStartDate = dayjs(startDate)
			.subtract(1, "week")
			.startOf("week")
			.format("YYYY-MM-DD");
		const newEndDate = dayjs(endDate)
			.subtract(1, "week")
			.endOf("week")
			.format("YYYY-MM-DD");

		setStartDate(newStartDate);
		setEndDate(newEndDate);
	}, [endDate, startDate]);

	const handleNextWeek = useCallback(() => {
		const newStartDate = dayjs(startDate)
			.add(1, "week")
			.startOf("week")
			.format("YYYY-MM-DD");
		const newEndDate = dayjs(endDate)
			.add(1, "week")
			.endOf("week")
			.format("YYYY-MM-DD");

		setStartDate(newStartDate);
		setEndDate(newEndDate);
	}, [endDate, startDate]);

	const handleSlotDuration = (e: SelectChangeEvent<number>) =>
		setSlotDuration(Number(e.target.value));

	const durationOptions = durations?.map(dur => {
		return {
			value: dur,
			label: formatMinutesLabel(dur),
		};
	});

	const handleToday = () => {
		const startDate = dayjs().startOf("week").format("YYYY-MM-DD");
		const endDate = dayjs().endOf("week").format("YYYY-MM-DD");
		setStartDate(startDate);
		setEndDate(endDate);
	};

	const period = `${dayjs(startDate).format("D MMMM")} - ${dayjs(endDate).format("D MMM YYYY")}`;

	return (
		<CalendarEvents
			calendar={calendar}
			durationOptions={durationOptions ?? []}
			minSlotTime={calendar?.min_slot_time}
			maxSlotTime={calendar?.max_slot_time}
			onHandleNextWeek={handleNextWeek}
			onHandlePreviousWeek={handlePreviousWeek}
			onHandleSlotDuration={handleSlotDuration}
			onHandleToday={handleToday}
			slotDuration={slotDuration}
			isLoading={isLoadingDurations || isLoadingCalendar}
			period={period}
		/>
	);
}
