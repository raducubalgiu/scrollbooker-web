import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { SlotType } from "../calendar-utils/calendar-types";
import CalendarBookedEvent from "./CalendarBookedEvent";
import CalendarUnbookedEvent from "./CalendarUnbookedEvent";
import CalendarEventDisabled from "./CalendarEventDisabled.";

type CalendarEventProps = {
	slot: SlotType;
	eventHeight: number;
	topOffset: number;
};

export default function CalendarEvent({
	slot,
	eventHeight,
	topOffset,
}: CalendarEventProps) {
	const renderEvent = useMemo(() => {
		switch (true) {
			case slot.is_blocked:
				return <CalendarUnbookedEvent slot={slot} height={eventHeight} />;
			case slot.is_closed:
				return <CalendarEventDisabled label="Închis" height={eventHeight} />;
			case slot.is_booked:
				return <CalendarBookedEvent info={slot?.info} height={eventHeight} />;
			default:
				return <CalendarUnbookedEvent slot={slot} height={eventHeight} />;
		}
	}, [eventHeight, slot]);

	const containerStyles = useMemo(() => {
		return () => ({
			top: topOffset,
			left: 0,
			right: 0,
			position: "absolute",
			overflow: "hidden",
		});
	}, [topOffset]);

	return <Box sx={containerStyles}>{renderEvent}</Box>;
}
