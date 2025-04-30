"use client";

import {
	Alert,
	Button,
	Paper,
	SelectChangeEvent,
	TableContainer,
} from "@mui/material";
import dayjs from "dayjs";
import CalendarEventsToolbar from "./CalendarEventsToolbar/CalendarEventsToolbar";
import { CalendarType } from "./calendar-utils/calendar-types";
import CalendarEventsHeader from "./CalendarEventsHeader/CalendarEventsHeader";
import CalendarEventsBody from "./CalendarEventsBody/CalendarEventsBody";
import useCalendarEvents from "./useCalendarEvents";

import "dayjs/locale/ro";
import CalendarLoading from "./CalendarLoading";
import { useWindowSize } from "@/utils/useWindowSize";
import { isEmpty } from "lodash";
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
		clearBlockedSlots,
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
				{!isEmpty(blockedSlots) && (
					<Alert
						sx={{
							height: 50,
							position: "sticky",
							top: 100,
							left: 0,
							zIndex: 100,
						}}
						severity="warning"
						action={
							<>
								<Button
									color="inherit"
									size="small"
									variant="contained"
									onClick={clearBlockedSlots}
								>
									Renunță
								</Button>
								<Button
									color="primary"
									size="small"
									variant="contained"
									sx={{ ml: 2.5 }}
								>
									Salvează
								</Button>
							</>
						}
					>
						Atenție! Clienții nu vor mai putea rezerva sloturile pe care ai
						decis să le blochezi. Ești sigur că vrei să salvezi această acțiune?
					</Alert>
				)}
				{!isLoading && (
					<>
						<CalendarEventsHeader
							blockedSlots={blockedSlots}
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
