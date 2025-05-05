"use client";

import React, { useState, useCallback } from "react";
import { createContext, useContext } from "react";
import { SelectChangeEvent } from "@mui/material";
import {
	CalendarType,
	SlotType,
} from "@/components/cutomized/CalendarEvents/calendar-types";
import dayjs from "dayjs";

import "dayjs/locale/ro";
dayjs.locale("ro");

export enum DensityEnum {
	COMPACT = 1,
	COMFORTABLE = 1.2,
	SPACIOUS = 1.5,
}

export type BlockedDayType = { day: string; slots: SlotType[] };
export enum BlockedDayActionEnum {
	ADD = "ADD",
	REMOVE = "REMOVE",
}

const densityValues = Object.values(DensityEnum).filter(
	v => typeof v === "number"
) as number[];

export type CalendarContextType = {
	calendar: CalendarType | undefined;
	density: DensityEnum;
	startDate: string;
	endDate: string;
	fullScreen: boolean;
	slotDuration: number;
	handleFullScreen: () => void;
	handleNextWeek: () => void;
	handlePreviousWeek: () => void;
	handleToday: () => void;
	handleDensity: () => void;
	handleDuration: (e: SelectChangeEvent<number>) => void;
	setCalendar: (cal: CalendarType | undefined) => void;
	updateDaySlots: (date: string, updatedSlots: SlotType[]) => void;
	updateSlot: (slot: SlotType) => void;
};

export const CalendarEventsContext = createContext<
	CalendarContextType | undefined
>(undefined);

export const useCalendarEventsContext = () => {
	const context = useContext(CalendarEventsContext);
	if (!context)
		throw new Error(
			"useCalendarContext must be used within a CalendarProvider"
		);
	return context;
};

const DEFAULT_START_DATE = dayjs().startOf("week").format("YYYY-MM-DD");
const DEFAULT_END_DATE = dayjs().endOf("week").format("YYYY-MM-DD");

export const CalendarEventsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [calendar, setCalendar] = useState<CalendarType | undefined>(undefined);
	const [slotDuration, setSlotDuration] = useState<number>(60);
	const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
	const [endDate, setEndDate] = useState(DEFAULT_END_DATE);
	const [fullScreen, setFullScreen] = useState(false);
	const [density, setDensity] = useState(DensityEnum.COMFORTABLE);

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

	const handleToday = useCallback(() => {
		const startDate = dayjs().startOf("week").format("YYYY-MM-DD");
		const endDate = dayjs().endOf("week").format("YYYY-MM-DD");
		setStartDate(startDate);
		setEndDate(endDate);
	}, []);

	const handleFullScreen = useCallback(
		() => setFullScreen(fullScreen => !fullScreen),
		[]
	);

	const handleDensity = useCallback(() => {
		const currentIndex = densityValues.indexOf(density);
		const nextIndex = (currentIndex + 1) % densityValues.length;
		setDensity(densityValues[nextIndex]);
	}, [density]);

	const handleDuration = useCallback(
		(e: SelectChangeEvent<number>) => setSlotDuration(Number(e.target.value)),
		[]
	);

	const updateDaySlots = useCallback(
		(date: string, updatedSlots: SlotType[]) => {
			setCalendar(prev => {
				if (!prev) return prev;

				return {
					...prev,
					data: prev.data.map(day =>
						day.date === date ? { ...day, slots: updatedSlots } : day
					),
				};
			});
		},
		[]
	);

	const updateSlot = useCallback((slot: SlotType) => {
		setCalendar(prev => {
			if (!prev) return prev;

			return {
				...prev,
				data: prev.data.map(day => ({
					...day,
					slots: day.slots.map(s =>
						s.start_date_utc === slot.start_date_utc ? slot : s
					),
				})),
			};
		});
	}, []);

	return (
		<CalendarEventsContext.Provider
			value={{
				calendar,
				setCalendar,
				updateDaySlots,
				updateSlot,
				startDate,
				endDate,
				fullScreen,
				density,
				slotDuration,
				handleNextWeek,
				handlePreviousWeek,
				handleToday,
				handleFullScreen,
				handleDensity,
				handleDuration,
			}}
		>
			{children}
		</CalendarEventsContext.Provider>
	);
};
