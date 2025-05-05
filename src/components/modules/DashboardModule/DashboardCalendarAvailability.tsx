import React, { useState } from "react";
import { Paper } from "@mui/material";
import dayjs from "dayjs";
import CalendarAvailability from "@/components/cutomized/CalendarAvailability/CalendarAvailability";
import { useCustomQuery } from "@/hooks/useHttp";

type DashboardCalendarAvailabilityProps = { userId: number | undefined };

export default function DashboardCalendarAvailability({
	userId,
}: DashboardCalendarAvailabilityProps) {
	const [currentMonth, setCurrentMonth] = useState<string>(
		dayjs().startOf("month").format("YYYY-MM")
	);

	const { data: availableDays, isLoading: isLoadingMonth } = useCustomQuery<
		string[]
	>({
		key: ["get-calendar-availability", userId, currentMonth],
		url: "/api/dashboard/calendar-availability",
		params: { userId, month: currentMonth },
		options: { enabled: !!userId && !!currentMonth },
	});

	const handlePreMonth = () => {
		const preMonth = dayjs(currentMonth).subtract(1, "month");
		setCurrentMonth(preMonth.format("YYYY-MM"));
	};
	const handleNextMonth = () => {
		const nextMonth = dayjs(currentMonth).add(1, "month");
		setCurrentMonth(nextMonth.format("YYYY-MM"));
	};

	return (
		<Paper sx={{ p: 2.5 }}>
			<CalendarAvailability
				countryCode="RO"
				availableDates={availableDays}
				currentMonth={currentMonth}
				onHandlePreMonth={handlePreMonth}
				onHandleNextMonth={handleNextMonth}
				isLoading={isLoadingMonth}
			/>
		</Paper>
	);
}
