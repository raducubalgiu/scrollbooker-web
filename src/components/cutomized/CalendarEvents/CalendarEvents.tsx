"use client";
import { memo } from "react";
import { Box, Paper, TableContainer } from "@mui/material";
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

function CalendarEvents({
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
			const next = current.add(slotDuration, "minute");

			if (next.isAfter(end)) {
				const diff = next.diff(end, "minute");
				const newNext = current.add(diff, "minute");

				slots.push({
					start: current.format("HH:mm"),
					end: newNext.format("HH:mm"),
					height: slotDuration - diff,
					isShortSlot: true,
				});
				break;
			}
			slots.push({
				start: current.format("HH:mm"),
				end: next.format("HH:mm"),
				height: slotDuration,
				isShortSlot: false,
			});

			current = next;
		}

		return slots;
	}, [calendar, slotDuration]);

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
											onClick={() => {}}
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
					{!isLoading && (
						<Box>
							<CalendarEventsHeader days={calendar?.data} />
							<CalendarEventsBody
								days={calendar?.data}
								timeSlots={timeSlots()}
								slotDuration={slotDuration}
								minSlotTime={calendar?.min_slot_time}
								maxSlotTime={calendar?.max_slot_time}
							/>
						</Box>
					)}
				</Fragment>
			</Paper>
			{isLoading && <CalendarLoading />}
		</TableContainer>
	);
}

export default memo(CalendarEvents);
