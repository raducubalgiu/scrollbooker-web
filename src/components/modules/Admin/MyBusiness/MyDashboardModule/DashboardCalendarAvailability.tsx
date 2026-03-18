import React, { useState } from "react";
import { Paper } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import CalendarAvailability from "@/components/cutomized/CalendarAvailability/CalendarAvailability";
import { useCustomQuery } from "@/hooks/useHttp";

type DashboardCalendarAvailabilityProps = { userId: number | undefined };

export default function DashboardCalendarAvailability({
	userId,
}: DashboardCalendarAvailabilityProps) {
	const [currentMonth, setCurrentMonth] = useState<string>(
		dayjs().startOf("month").format("YYYY-MM")
	)

	const [startDate, setStartDate] = useState<string>(
		dayjs().startOf("month").format("YYYY-MM-DD")
	);
	const [endDate, setEndDate] = useState<string>(
		dayjs().endOf("month").format("YYYY-MM-DD")
	);

	const { data: availableDays, isLoading: isLoadingMonth } = useCustomQuery<
		string[]
	>({
		key: ["get-calendar-availability", userId, startDate, endDate],
		url: "/api/dashboard/calendar-availability",
		params: { userId, startDate, endDate },
		options: { enabled: !!userId && !!startDate && !!endDate },
	});

	const updateMonth = (month: Dayjs) => {
		setCurrentMonth(month.format("YYYY-MM"));
		setStartDate(month.startOf("month").format("YYYY-MM-DD"))
		setEndDate(month.endOf("month").format("YYYY-MM-DD"))
	}

	return (
		<Paper sx={{ p: 2.5 }}>
			<CalendarAvailability
				countryCode="RO"
				availableDates={availableDays}
				currentMonth={currentMonth}
				onHandlePreMonth={() => updateMonth(dayjs(currentMonth).subtract(1, "month"))}
				onHandleNextMonth={() => updateMonth(dayjs(currentMonth).add(1, "month"))}
				isLoading={isLoadingMonth}
			/>
		</Paper>
	);
}
