"use client";

import React, { useState, useCallback } from "react";
import { createContext, useContext } from "react";
import dayjs from "dayjs";

import "dayjs/locale/ro";
import { SelectChangeEvent } from "@mui/material";
import { SlotType } from "@/components/cutomized/CalendarEvents/calendar-utils/calendar-types";
import { differenceBy, findIndex, unionBy } from "lodash";
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
	density: DensityEnum;
	startDate: string;
	endDate: string;
	fullScreen: boolean;
	slotDuration: number;
	blockedDaysSlots: BlockedDayType[];
	handleFullScreen: () => void;
	handleNextWeek: () => void;
	handlePreviousWeek: () => void;
	handleToday: () => void;
	handleDensity: () => void;
	handleDuration: (e: SelectChangeEvent<number>) => void;
	handleBlockedDaysSlots: (
		daySlots: BlockedDayType,
		action: BlockedDayActionEnum
	) => void;
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
	const [slotDuration, setSlotDuration] = useState<number>(60);
	const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
	const [endDate, setEndDate] = useState(DEFAULT_END_DATE);
	const [fullScreen, setFullScreen] = useState(false);
	const [density, setDensity] = useState(DensityEnum.COMFORTABLE);
	const [blockedDaysSlots, setBlockedDaysSlots] = useState<BlockedDayType[]>(
		[]
	);

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

	const handleBlockedDaysSlots = (
		blockedDay: BlockedDayType,
		action: BlockedDayActionEnum
	) => {
		if (action === BlockedDayActionEnum.ADD) {
			setBlockedDaysSlots(prev => {
				const existingDayIndex = findIndex(prev, { day: blockedDay.day });

				if (existingDayIndex !== -1) {
					const updated = [...prev];
					const mergedSlots = unionBy(
						updated[existingDayIndex].slots,
						blockedDay.slots,
						"start_date_utc"
					);
					updated[existingDayIndex] = {
						...updated[existingDayIndex],
						slots: mergedSlots,
					};
				}

				return [...prev, blockedDay];
			});
		} else if (action === BlockedDayActionEnum.REMOVE) {
			setBlockedDaysSlots(prev => {
				return prev
					.map(day => {
						if (day.day === blockedDay.day) {
							const filteredSlots = differenceBy(
								day.slots,
								blockedDay.slots,
								"start_date_utc"
							);
							return { ...day, slots: filteredSlots };
						}
						return day;
					})
					.filter(day => day.slots.length > 0);
			});
		}
	};

	return (
		<CalendarEventsContext.Provider
			value={{
				startDate,
				endDate,
				fullScreen,
				density,
				slotDuration,
				blockedDaysSlots,
				handleNextWeek,
				handlePreviousWeek,
				handleToday,
				handleFullScreen,
				handleDensity,
				handleDuration,
				handleBlockedDaysSlots,
			}}
		>
			{children}
		</CalendarEventsContext.Provider>
	);
};
