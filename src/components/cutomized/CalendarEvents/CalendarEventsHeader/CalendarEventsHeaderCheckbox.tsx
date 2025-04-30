import React, { ChangeEvent, useState } from "react";
import { Checkbox } from "@mui/material";
import { SlotType } from "../calendar-utils/calendar-types";
import { BlockedSlotActionEnum } from "../useCalendarEvents";

type CalendarEventsHeaderCheckboxProps = {
	slots: SlotType[];
	defaultChecked: boolean;
	onHandleBlockSlots: (
		slots: SlotType[],
		action: BlockedSlotActionEnum
	) => void;
};

export default function CalendarEventsHeaderCheckbox({
	slots,
	defaultChecked,
	onHandleBlockSlots,
}: CalendarEventsHeaderCheckboxProps) {
	const [checked, setChecked] = useState(defaultChecked);

	const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
		const action = e.target.checked
			? BlockedSlotActionEnum.CREATE
			: BlockedSlotActionEnum.DELETE;
		onHandleBlockSlots(slots, action);
	};

	return (
		<Checkbox checked={checked} onChange={handleCheckbox} color="default" />
	);
}
