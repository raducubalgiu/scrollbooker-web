import { styled } from "@mui/material/styles";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { Badge } from "@mui/material";
import React, { memo } from "react";
import { Dayjs } from "dayjs";

type AvailableSlot = {
	start_date: string;
	end_date: string;
};

type DayInfo = {
	is_closed: boolean;
	available_slots: AvailableSlot[];
};

type CalendarData = Record<string, DayInfo>;

type CustomDayProps = PickersDayProps<Dayjs> & {
	days: CalendarData | undefined;
};

const GreenBadge = styled(Badge)(() => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#66bb6a",
		width: 7,
		height: 7,
		borderRadius: "50%",
		padding: 0,
	},
}));

const RedBadge = styled(Badge)(() => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#D32F2F",
		width: 7,
		height: 7,
		borderRadius: "50%",
		padding: 0,
	},
}));

const CalendarDay: React.FC<CustomDayProps> = props => {
	const { day, days, ...other } = props;
	const dateString = day.format("YYYY-MM-DD");
	const dayInfo = days?.[dateString];

	if (!dayInfo) {
		return <PickersDay day={day} {...other} hidden />;
	}

	if (dayInfo.is_closed) {
		return (
			<RedBadge
				overlap="circular"
				variant="dot"
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<PickersDay day={day} {...other} />
			</RedBadge>
		);
	}

	if (dayInfo.available_slots.length > 0) {
		return (
			<GreenBadge
				overlap="circular"
				variant="dot"
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<PickersDay day={day} {...other} />
			</GreenBadge>
		);
	}

	return <PickersDay day={day} {...other} />;
};

export const DashboardCalendarAvailabilityDay = memo(CalendarDay);
