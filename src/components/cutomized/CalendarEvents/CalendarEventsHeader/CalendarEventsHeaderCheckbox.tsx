import { ChangeEvent, useMemo, useState } from "react";
import { DayInfo } from "../calendar-types";
import { Checkbox, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { some, every } from "lodash";
import CalendarEventsHeaderModal from "./CalendarEventsHeaderModal";
import { useUserClientSession } from "@/lib/auth/get-user-client";

type CalendarEventsHeaderCheckboxProps = {
	day: DayInfo;
};

export default function CalendarEventsHeaderCheckbox({
	day,
}: CalendarEventsHeaderCheckboxProps) {
	const { userId } = useUserClientSession();
	const [isBlockedDay, setIsBlockedDay] = useState(!!day.is_blocked);
	const [open, setOpen] = useState(false);

	const hideCheckbox = useMemo(() => {
		return (
			some(day.slots, { is_booked: true }) ||
			every(day.slots, { is_blocked: true }) ||
			day.is_closed ||
			dayjs().isAfter(dayjs(day.date))
		);
	}, [day]);

	const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		setIsBlockedDay(e.target.checked);
		setOpen(true);
	};

	if (hideCheckbox) return null;

	return (
		<>
			<CalendarEventsHeaderModal
				open={open}
				day={day}
				userId={userId}
				handleClose={() => {
					setIsBlockedDay(false);
					setOpen(false);
				}}
			/>
			<Tooltip title="Blochează această zi">
				<Checkbox checked={isBlockedDay} onChange={handleCheckbox} />
			</Tooltip>
		</>
	);
}
