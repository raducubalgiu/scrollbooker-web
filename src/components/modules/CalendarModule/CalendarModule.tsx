"use client";

import { useCallback } from "react";
import { useCustomQuery } from "@/hooks/useHttp";
import CalendarEvents from "@/components/cutomized/CalendarEvents/CalendarEvents";
import { CalendarType } from "@/components/cutomized/CalendarEvents/calendar-types";
import dayjs from "dayjs";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

const DEFAULT_START_DATE = dayjs().startOf("week").format("YYYY-MM-DD");
const DEFAULT_END_DATE = dayjs().endOf("week").format("YYYY-MM-DD");

export default function CalendarModule() {
	const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
	const [endDate, setEndDate] = useState(DEFAULT_END_DATE);
	const [slotDuration, setSlotDuration] = useState(60);

	const { data: calendar, isLoading } = useCustomQuery<CalendarType>({
		key: ["calendar", startDate, endDate, slotDuration],
		url: "/api/calendar",
		params: {
			startDate,
			endDate,
			userId: 55,
			slotDuration,
			userTimezone: "Europe/Bucharest",
		},
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

	const durationOptions = [
		{ value: 15, label: "15 Minute" },
		{ value: 30, label: "30 de Minute" },
		{ value: 60, label: "O ora" },
	];

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
			durationOptions={durationOptions}
			minSlotTime={calendar?.min_slot_time}
			maxSlotTime={calendar?.max_slot_time}
			onHandleNextWeek={handleNextWeek}
			onHandlePreviousWeek={handlePreviousWeek}
			onHandleSlotDuration={handleSlotDuration}
			onHandleToday={handleToday}
			slotDuration={slotDuration}
			isLoading={isLoading}
			period={period}
		/>
	);
}
