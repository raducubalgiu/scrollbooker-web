import React, { useMemo } from "react";
import Grid from "@mui/material/Grid2";
import { Typography, Box, Stack } from "@mui/material";
import dayjs from "dayjs";
import { DayInfo } from "../calendar-utils/calendar-types";
import { Theme } from "@mui/system";
import CalendarEvent from "../CalendarEvent/CalendarEvent";
import CalendarEventClosed from "../CalendarEvent/CalendarEventClosed";

type CalendarEventsBodyProps = {
	timeSlots: {
		start: string;
		end: string;
		height: number;
		isShortSlot: boolean;
	}[];
	slotDuration: number;
	days: DayInfo[] | undefined;
	minSlotTime: string | undefined;
	maxSlotTime: string | undefined;
};

export default function CalendarEventsBody({
	days,
	timeSlots,
	slotDuration,
	minSlotTime,
	maxSlotTime,
}: CalendarEventsBodyProps) {
	const styles = {
		slotLeft: {
			alignItems: "flex-start",
			justifyContent: "flex-start",
			display: "flex",
			borderLeft: "1px solid rgba(81, 81, 81, 1)",
			borderBottom: "1px solid rgba(81, 81, 81, 1)",
			p: 2.5,
		},
		dayContainer: {
			position: "relative",
			borderLeft: "1px solid rgba(81, 81, 81, 1)",
			"&:last-child": {
				borderRight: "1px solid rgba(81, 81, 81, 1)",
			},
			flex: 1,
		},
	};

	const totalMinutes = dayjs(`1900-01-01T${maxSlotTime}`).diff(
		dayjs(`1900-01-01T${minSlotTime}`),
		"minute"
	);

	const VISIBLE_MAX_HEIGHT = 2000;
	const BASE_SLOT_HEIGHT_PER_MINUTE = VISIBLE_MAX_HEIGHT / totalMinutes;
	const SLOT_HEIGHT_PER_MINUTE = BASE_SLOT_HEIGHT_PER_MINUTE;

	const dayStyles = useMemo(() => {
		return (theme: Theme, day: DayInfo) => {
			//const { primary, background } = theme.palette;
			const isToday = dayjs(day.date).isSame(dayjs(), "day");

			return {
				...styles.dayContainer,
				backgroundColor: isToday ? "rgb(245, 155, 66, 0.4)" : "",
			};
		};
	}, [styles.dayContainer]);

	const renderSlots = (day: DayInfo) =>
		day.slots.map((slot, slotIndex) => {
			const start = dayjs(slot.start_date_locale);
			const end = dayjs(slot.end_date_locale);
			const durationMinutes = end.diff(start, "minute");

			const topOffset =
				start.diff(dayjs(`${day.date}T${minSlotTime}`), "minute") *
				SLOT_HEIGHT_PER_MINUTE;
			const eventHeight = durationMinutes * SLOT_HEIGHT_PER_MINUTE;

			return (
				<CalendarEvent
					key={slotIndex}
					slot={slot}
					topOffset={topOffset}
					eventHeight={eventHeight}
				/>
			);
		});

	return (
		<Grid container>
			<Grid sx={{ width: 80 }}>
				{timeSlots.map((slot, i) => (
					<Box
						key={i}
						height={slot.height * SLOT_HEIGHT_PER_MINUTE}
						sx={styles.slotLeft}
					>
						<Typography>{slot.start}</Typography>
					</Box>
				))}
			</Grid>

			{(days ?? []).map((day, dayIndex) => {
				return (
					<Grid key={dayIndex} sx={theme => dayStyles(theme, day)}>
						{timeSlots.map((slot, i) => {
							return (
								<Stack
									key={i}
									height={slot.height * SLOT_HEIGHT_PER_MINUTE}
									borderBottom="1px solid"
									borderColor="border.main"
								>
									{day.is_closed || slot.isShortSlot ? (
										<CalendarEventClosed
											message={slot.isShortSlot ? "Indisponibil" : "Închis"}
											height={slotDuration * SLOT_HEIGHT_PER_MINUTE}
											sx={{ m: 1 }}
										/>
									) : null}
								</Stack>
							);
						})}

						{renderSlots(day)}
					</Grid>
				);
			})}
		</Grid>
	);
}
