"use client";

import { Box, Paper, Stack, TableContainer, Typography } from "@mui/material";
import dayjs from "dayjs";
import CalendarEventsToolbar from "./CalendarEventsToolbar/CalendarEventsToolbar";
import { CalendarType } from "./calendar-utils/calendar-types";
import CalendarEventsHeader from "./CalendarEventsHeader/CalendarEventsHeader";
import CalendarEventsBody from "./CalendarEventsBody/CalendarEventsBody";

import CalendarLoading from "./CalendarLoading";
import { useWindowSize } from "@/utils/useWindowSize";
import { useCalendarEventsContext } from "@/providers/CalendarEventsProvider";
import { Fragment, useCallback } from "react";

type CalendarEventsProps = {
	fullScreen: boolean;
	calendar: CalendarType | undefined;
	durationOptions: { value: number; label: string }[];
	minSlotTime: string | undefined;
	maxSlotTime: string | undefined;
	isLoading: boolean;
};

const VISIBLE_MAX_HEIGHT = 1500;

export default function CalendarEvents({
	fullScreen,
	durationOptions,
	calendar,
	isLoading,
}: CalendarEventsProps) {
	const { width } = useWindowSize();
	const { density, handleDensity, slotDuration, handleDuration } =
		useCalendarEventsContext();

	const timeSlots = useCallback(() => {
		if (!slotDuration) return [];

		const slots = [];
		let current = dayjs(`2025-04-21T${calendar?.min_slot_time}`);
		const end = dayjs(`2025-04-21T${calendar?.max_slot_time}`);

		while (current.isBefore(end)) {
			slots.push(current.format("HH:mm"));
			current = current.add(slotDuration, "minute");
		}

		return slots;
	}, [calendar, slotDuration]);

	const totalMinutes = dayjs(`1900-01-01T${calendar?.max_slot_time}`).diff(
		dayjs(`1900-01-01T${calendar?.min_slot_time}`),
		"minute"
	);

	const BASE_SLOT_HEIGHT_PER_MINUTE = VISIBLE_MAX_HEIGHT / totalMinutes;
	const SLOT_HEIGHT_PER_MINUTE = BASE_SLOT_HEIGHT_PER_MINUTE * density;

	const DRAWER_DESKTOP_WIDTH = 350;
	const calendarWidth = width ? width - DRAWER_DESKTOP_WIDTH - 85 : "100%";

	return (
		<TableContainer
			component={Paper}
			sx={{ maxHeight: fullScreen ? "100vh" : "90vh", overflow: "auto" }}
		>
			<Paper sx={{ width: fullScreen ? "100%" : calendarWidth }}>
				<Fragment>
					<CalendarEventsToolbar
						density={density}
						slotDuration={slotDuration}
						durationOptions={durationOptions}
						onHandleSlotDuration={handleDuration}
						onHandleDensity={handleDensity}
						isLoading={isLoading}
					/>
					{/* {!isEmpty(blockedSlots) && (
					<Fade in={!isEmpty(blockedSlots)}>
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
							decis să le blochezi. Ești sigur că vrei să salvezi această
							acțiune?
						</Alert>
					</Fade>
				)} */}
					<Box>
						<CalendarEventsHeader days={calendar?.data} />
						<CalendarEventsBody
							days={calendar?.data}
							slotHeightPerMinute={SLOT_HEIGHT_PER_MINUTE}
							timeSlots={timeSlots()}
							slotDuration={slotDuration}
							minSlotTime={calendar?.min_slot_time}
						/>
					</Box>
				</Fragment>
				{!calendar && !isLoading && (
					<Stack p={2.5} alignItems="center">
						<Typography>Calendarul nu a putut fi afișat</Typography>
					</Stack>
				)}
			</Paper>
			{isLoading && <CalendarLoading />}
		</TableContainer>
	);
}
