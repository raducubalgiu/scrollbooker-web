import React, { useMemo } from "react";
import Grid from "@mui/material/Grid2";
import { Typography, Box, Stack } from "@mui/material";
import dayjs from "dayjs";
import { DayInfo } from "../calendar-utils/calendar-types";
import CalendarEvent from "../CalendarEvent/CalendarEvent";
import { Theme } from "@mui/system";
import CalendarEventDisabled from "../CalendarEvent/CalendarEventDisabled.";

type CalendarEventsBodyProps = {
	slotHeightPerMinute: number;
	timeSlots: string[];
	slotDuration: number;
	days: DayInfo[] | undefined;
	minSlotTime: string | undefined;
};

export default function CalendarEventsBody({
	days,
	slotHeightPerMinute,
	timeSlots,
	slotDuration,
	minSlotTime,
}: CalendarEventsBodyProps) {
	const styles = {
		slotLeft: {
			alignItems: "center",
			justifyContent: "center",
			display: "flex",
			borderLeft: "1px solid rgba(81, 81, 81, 1)",
			borderBottom: "1px solid rgba(81, 81, 81, 1)",
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

	const dayStyles = useMemo(() => {
		return (theme: Theme, day: DayInfo) => {
			const { primary, background } = theme.palette;
			const isToday = dayjs(day.date).isSame(dayjs(), "day");

			return {
				...styles.dayContainer,
				backgroundColor: isToday ? primary[300] : background.default,
			};
		};
	}, [styles.dayContainer]);

	const renderSlots = useMemo(() => {
		return (day: DayInfo) =>
			day.slots.map((slot, i) => {
				const start = dayjs(slot.start_date_locale);
				const end = dayjs(slot.end_date_locale);
				const durationMinutes = end.diff(start, "minute");

				const topOffset =
					start.diff(dayjs(`${day.date}T${minSlotTime}`), "minute") *
					slotHeightPerMinute;
				const eventHeight = durationMinutes * slotHeightPerMinute;

				return (
					<CalendarEvent
						key={i}
						dayDate={day.date}
						slot={slot}
						topOffset={topOffset}
						eventHeight={eventHeight}
					/>
				);
			});
	}, [minSlotTime, slotHeightPerMinute]);

	return (
		<Grid container>
			<Grid sx={{ width: 80 }}>
				{timeSlots.map(time => (
					<Box
						key={time}
						height={slotDuration * slotHeightPerMinute}
						sx={styles.slotLeft}
					>
						<Typography>{time}</Typography>
					</Box>
				))}
			</Grid>

			{(days ?? []).map((day, i) => {
				return (
					<Grid key={i} sx={theme => dayStyles(theme, day)}>
						{timeSlots.map(time => (
							<Stack
								key={time}
								height={slotDuration * slotHeightPerMinute}
								borderBottom="1px solid"
								borderColor="border.main"
								justifyContent="center"
								alignItems="center"
							>
								{day.is_closed ? (
									<CalendarEventDisabled
										label="Inchis"
										height={slotDuration * slotHeightPerMinute}
									/>
								) : null}
							</Stack>
						))}

						{renderSlots(day)}
					</Grid>
				);
			})}
		</Grid>
	);
}
