import { ChangeEvent, useMemo, useState } from "react";
import { Checkbox, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { some, every } from "lodash";
import { DayInfo } from "../calendar-types";
import { useUserClientSession } from "@/lib/auth/get-user-client";
import CalendarEventsBlockModal from "../CalendarEventsModals/CalendarEventsBlockModal";
import { useCalendarEventsContext } from "@/providers/CalendarEventsProvider";

type CalendarEventsHeaderCheckboxProps = {
	day: DayInfo;
};

export default function CalendarEventsHeaderCheckbox({
	day,
}: CalendarEventsHeaderCheckboxProps) {
	const { updateDaySlots } = useCalendarEventsContext();
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

	const messages = [
		{ value: "Zi legală liberă", name: "Zi legală liberă" },
		{ value: "Concediu de odihnă", name: "Concediu de odihnă" },
		{ value: "Concediu medical", name: "Concediu medical" },
		{ value: "Altele", name: "Altele" },
	];

	if (hideCheckbox) return null;

	const handleCloseModal = () => {
		setIsBlockedDay(false);
		setOpen(false);
	};

	const updater = day.slots.map(slot => {
		return {
			startDate: slot.start_date_utc,
			endDate: slot.end_date_utc,
			userId,
		};
	});

	const handleUpdateSlots = (updatedMessage: string) => {
		const updatedSlots = day.slots.map(slot => {
			return {
				...slot,
				is_blocked: true,
				message: updatedMessage,
			};
		});
		updateDaySlots(day.date, updatedSlots);
		toast.success("Datele au fost salvate cu succes!");
		setOpen(false);
	};

	return (
		<>
			<CalendarEventsBlockModal
				open={open}
				messages={messages}
				title="Ești sigur că dorești să blochezi sloturile acestei zi?"
				handleClose={handleCloseModal}
				updater={updater}
				onSuccessUpdate={handleUpdateSlots}
			/>
			<Tooltip title="Blochează această zi">
				<Checkbox checked={isBlockedDay} onChange={handleCheckbox} />
			</Tooltip>
		</>
	);
}
