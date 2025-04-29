"use client";

import { Paper, SelectChangeEvent, TableContainer } from "@mui/material";
import dayjs from "dayjs";
import CalendarEventsToolbar from "./CalendarEventsToolbar";
import { CalendarType } from "./calendar-types";
import CalendarEventsHeader from "./CalendarEventsHeader";
import CalendarEventsBody from "./CalendarEventsBody";
import useCalendarEvents from "./useCalendarEvents";

import "dayjs/locale/ro";
import CalendarLoading from "./CalendarLoading";
import { useWindowSize } from "@/utils/useWindowSize";
dayjs.locale("ro");

type CalendarEventsProps = {
	calendar: CalendarType | undefined;
	durationOptions: { value: number; label: string }[];
	minSlotTime: string | undefined;
	maxSlotTime: string | undefined;
	onHandlePreviousWeek: () => void;
	onHandleNextWeek: () => void;
	onHandleSlotDuration: (e: SelectChangeEvent<number>) => void;
	onHandleToday: () => void;
	slotDuration: number;
	isLoading: boolean;
	period: string;
};

const VISIBLE_MAX_HEIGHT = 1500;

export default function CalendarEvents({
	durationOptions,
	calendar,
	minSlotTime,
	maxSlotTime,
	slotDuration,
	onHandlePreviousWeek,
	onHandleNextWeek,
	onHandleSlotDuration,
	onHandleToday,
	isLoading,
	period,
}: CalendarEventsProps) {
	const { width } = useWindowSize();
	const {
		timeSlots,
		density,
		totalMinutes,
		handleDensity,
		blockedSlots,
		handleBlockSlots,
	} = useCalendarEvents({
		minTime: minSlotTime,
		maxTime: maxSlotTime,
		slotDuration,
	});

	const BASE_SLOT_HEIGHT_PER_MINUTE = VISIBLE_MAX_HEIGHT / totalMinutes;
	const SLOT_HEIGHT_PER_MINUTE = BASE_SLOT_HEIGHT_PER_MINUTE * density;

	const DRAWER_DESKTOP_WIDTH = 350;
	const calendarWidth = width ? width - DRAWER_DESKTOP_WIDTH - 85 : "100%";

	return (
		<TableContainer
			component={Paper}
			sx={{ maxHeight: "90vh", overflow: "auto" }}
		>
			<Paper sx={{ width: calendarWidth }}>
				<CalendarEventsToolbar
					density={density}
					slotDuration={slotDuration}
					durationOptions={durationOptions}
					onHandleSlotDuration={onHandleSlotDuration}
					onHandleNextWeek={onHandleNextWeek}
					onHandlePreviousWeek={onHandlePreviousWeek}
					onHandleDensity={handleDensity}
					onHandleToday={onHandleToday}
					period={period}
				/>
				{!isLoading && (
					<>
						<CalendarEventsHeader
							days={calendar?.data}
							onHandleBlockSlots={handleBlockSlots}
						/>
						<CalendarEventsBody
							blockedSlots={blockedSlots}
							onHandleBlockSlots={handleBlockSlots}
							days={calendar?.data}
							slotHeightPerMinute={SLOT_HEIGHT_PER_MINUTE}
							timeSlots={timeSlots}
							slotDuration={slotDuration}
							minSlotTime={minSlotTime}
						/>
					</>
				)}
			</Paper>
			{isLoading && <CalendarLoading />}
		</TableContainer>
	);
}
