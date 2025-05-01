import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { SlotType } from "../calendar-utils/calendar-types";
import CalendarBookedEvent from "./CalendarBookedEvent";
import CalendarUnbookedEvent from "./CalendarUnbookedEvent";
import CalendarEventDisabled from "./CalendarEventDisabled.";

type CalendarEventProps = {
	dayDate: string;
	slot: SlotType;
	eventHeight: number;
	topOffset: number;
};

export default function CalendarEvent({
	dayDate,
	slot,
	eventHeight,
	topOffset,
}: CalendarEventProps) {
	const renderEvent = useMemo(() => {
		switch (true) {
			case slot.is_blocked:
				return (
					<CalendarUnbookedEvent
						dayDate={dayDate}
						slot={slot}
						height={eventHeight}
					/>
				);
			case slot.is_closed:
				return <CalendarEventDisabled label="Închis" height={eventHeight} />;
			case slot.is_booked:
				return <CalendarBookedEvent info={slot?.info} height={eventHeight} />;
			default:
				return (
					<CalendarUnbookedEvent
						dayDate={dayDate}
						slot={slot}
						height={eventHeight}
					/>
				);
		}
	}, [eventHeight, slot, dayDate]);

	// const getBgColor = useCallback(
	// 	(theme: Theme) => {
	// 		switch (true) {
	// 			case isClosedBookedOrChecked:
	// 				return "#1A1A1A";
	// 			case channel === "scroll_booker":
	// 				return theme.palette.primary[100];
	// 			case channel === "own_client":
	// 				return theme.palette.success.main;
	// 			default:
	// 				return "";
	// 		}
	// 	},
	// 	[channel, isClosedBookedOrChecked]
	// );

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
