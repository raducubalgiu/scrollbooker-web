"use client";

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Paper, Typography } from "@mui/material";
import { useCustomQuery } from "@/hooks/useHttp";
import "dayjs/locale/ro";
import { DashboardCalendarAvailabilityDay } from "./DashboardCalendarAvailabilityDay";

type AvailableSlot = {
	start_date: string;
	end_date: string;
};

type DayInfo = {
	is_closed: boolean;
	available_slots: AvailableSlot[];
};

type CalendarData = Record<string, DayInfo>;

const defaultStartDate = dayjs().format("YYYY-MM-DD");
const defaultEndDate = dayjs()
	.add(1, "month")
	.endOf("month")
	.format("YYYY-MM-DD");

type DashboardCalendarAvailabilityProps = {
	userId: number | undefined;
	slotDuration: number | undefined;
};

export default function DashboardCalendarAvailability({
	userId,
	slotDuration,
}: DashboardCalendarAvailabilityProps) {
	const [startDate, setStartDate] = React.useState(defaultStartDate);
	const [endDate, setEndDate] = React.useState(defaultEndDate);

	const { data: days, isLoading } = useCustomQuery<CalendarData>({
		key: ["fetch-calendar", startDate, endDate],
		url: `/api/dashboard/calendar-availability`,
		params: { startDate, endDate, userId, slotDuration },
		options: {
			enabled: !!slotDuration,
		},
	});

	const handleMonthChange = React.useCallback((date: Dayjs) => {
		let start = date.format("YYYY-MM-DD");

		const nowStartOfMonth = dayjs().startOf("month");
		if (date.isSame(nowStartOfMonth)) {
			start = dayjs().format("YYYY-MM-DD");
		}

		const end = date.endOf("month").format("YYYY-MM-DD");

		setStartDate(start);
		setEndDate(end);
	}, []);

	const styles = {
		day: {
			width: 45,
			height: 45,
			fontSize: 12,
		},
	};

	return (
		<Paper sx={{ py: 2.5, pb: 10 }}>
			<Typography
				sx={{ color: "gray", fontWeight: "600", fontSize: 14, ml: 2.5 }}
			>
				Date disponibile
			</Typography>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ro">
				<DateCalendar
					loading={isLoading}
					onMonthChange={handleMonthChange}
					disablePast={true}
					renderLoading={() => <DayCalendarSkeleton />}
					maxDate={dayjs().add(6, "months")}
					showDaysOutsideCurrentMonth={true}
					disableHighlightToday={false}
					disabled={!slotDuration}
					slots={{
						day: props => (
							<DashboardCalendarAvailabilityDay {...props} days={days} />
						),
					}}
					slotProps={{ day: { sx: styles.day } }}
					sx={{
						"& .MuiDateCalendar-root": { width: "100%" },
						"& .MuiDayCalendar-header span": styles.day,
						width: "100%",
					}}
					views={["day"]}
				/>
			</LocalizationProvider>
		</Paper>
	);
}
