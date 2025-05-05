import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/ro";
import { includes } from "lodash";
import CalendarAvailabilityHeader from "./CalendarAvailabilityHeader";
import CalendarAvailabilityDay from "./CalendarAvailabilityDay";

dayjs.extend(weekday);
dayjs.extend(localeData);

type CalendarAvailableProps = {
	countryCode: string;
	availableDates: string[] | undefined;
	currentMonth: string;
	onHandlePreMonth: () => void;
	onHandleNextMonth: () => void;
	isLoading: boolean;
};

export default function CalendarAvailability({
	countryCode,
	availableDates = [],
	currentMonth,
	onHandlePreMonth,
	onHandleNextMonth,
	isLoading,
}: CalendarAvailableProps) {
	const weekStart = countryCode === "RO" ? 1 : 0;
	dayjs.locale(countryCode === "RO" ? "ro" : "en");

	const firstDayOfMonth = dayjs(currentMonth).startOf("month");
	const lastDayOfMonth = dayjs(currentMonth).endOf("month");

	const start = firstDayOfMonth.subtract(
		(firstDayOfMonth.day() - weekStart + 7) % 7,
		"day"
	);
	const end = lastDayOfMonth.add(
		(lastDayOfMonth.day() - weekStart + 7) % 7,
		"day"
	);

	const days: Dayjs[] = [];
	let current = start;

	while (current.isBefore(end) || current.isSame(end)) {
		days.push(current);
		current = current.add(1, "day");
	}

	const weekdays = dayjs.weekdaysMin(true).map(day => day[0]);
	const disablePast = dayjs(currentMonth)
		.startOf("month")
		.isSame(dayjs().startOf("month"));

	return (
		<Box>
			<Typography color="grey.500" mb={2.5} fontSize={17}>
				Date disponibile
			</Typography>
			<CalendarAvailabilityHeader
				month={dayjs(currentMonth).format("MMMM YYYY")}
				disablePast={disablePast}
				onHandlePreMonth={onHandlePreMonth}
				onHandleNextMonth={onHandleNextMonth}
				isLoading={isLoading}
			/>
			<Grid container spacing={1} sx={{ px: 7.5, pb: 2.5, mt: 2.5 }}>
				{weekdays.map((day, idx) => (
					<Grid key={idx} size={12 / 7} sx={{ textAlign: "center", mb: 2.5 }}>
						<Typography color="grey.500" fontSize={15}>
							{day}
						</Typography>
					</Grid>
				))}

				{days.map((day, i) => {
					const isCurrentMonth = day.month() === dayjs(currentMonth).month();
					const formatted = day.format("YYYY-MM-DD");
					const isAvailable = includes(availableDates, formatted);
					const isToday =
						dayjs(day).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");

					return (
						<CalendarAvailabilityDay
							key={i}
							day={day.date()}
							isToday={isToday}
							isCurrentMonth={isCurrentMonth}
							isAvailable={isAvailable}
							isLoading={isLoading}
						/>
					);
				})}
			</Grid>
		</Box>
	);
}
