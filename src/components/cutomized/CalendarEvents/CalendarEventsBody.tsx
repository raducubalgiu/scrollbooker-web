import React from "react";
import Grid from "@mui/material/Grid2";
import { Typography, Box, Stack, Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { DayInfo } from "./calendar-types";
import CalendarEvent from "./CalendarEvent";
import { Theme } from "@mui/system";

type CalendarEventsBodyProps = {
	slotHeightPerMinute: number;
	timeSlots: string[];
	slotDuration: number;
	days: DayInfo[] | undefined;
	minSlotTime: string | undefined;
	eventBgColor: string;
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

	const getBgColor = (day: DayInfo, theme: Theme) => {
		switch (true) {
			case dayjs(day.date).isSame(dayjs(), "day"):
				return "#3A2305";
			case day.is_closed:
				return "#1A1A1A";
			default:
				return theme.palette.background.default;
		}
	};

	return (
		<Grid container>
			<Grid sx={{ width: 80 }}>
				{timeSlots.map(time => (
					<Box
						key={time}
						height={slotDuration * slotHeightPerMinute}
						sx={styles.slotLeft}
					>
						<Typography variant="caption">{time}</Typography>
					</Box>
				))}
			</Grid>

			{(days ?? []).map((day, i) => {
				return (
					<Grid
						key={i}
						sx={theme => ({
							bgcolor: getBgColor(day, theme),
							opacity: day.is_closed ? 0.4 : 1,
							...styles.dayContainer,
						})}
					>
						{timeSlots.map(time => (
							<Stack
								key={time}
								height={slotDuration * slotHeightPerMinute}
								borderBottom="1px solid rgba(81, 81, 81, 1)"
								justifyContent="center"
								alignItems="center"
							>
								{day.is_closed ? "Închis" : ""}
								{!day.is_closed && <Checkbox />}
							</Stack>
						))}

						{day.slots.map((slot, i) => {
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
									slot={slot}
									topOffset={topOffset}
									eventHeight={eventHeight - 15}
								/>
							);
						})}
					</Grid>
				);
			})}
		</Grid>
	);
}
