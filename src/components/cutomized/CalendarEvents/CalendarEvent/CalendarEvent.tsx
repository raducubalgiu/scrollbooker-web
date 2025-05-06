import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { SlotType } from "../calendar-types";
import CalendarBookedEvent from "./CalendarBookedEvent";
import CalendarUnbookedEvent from "./CalendarUnbookedEvent";
import { Theme } from "@mui/system";
import CalendarEventClosed from "./CalendarEventClosed";

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
			case slot.is_closed:
				return (
					<CalendarEventClosed message="Închis" height={eventHeight - 10} />
				);
			case slot.is_blocked:
				return <CalendarUnbookedEvent slot={slot} height={eventHeight} />;
			case slot.is_booked:
				return <CalendarBookedEvent slot={slot} />;
			default:
				return <CalendarUnbookedEvent slot={slot} height={eventHeight} />;
		}
	}, [slot, eventHeight]);

	const getBackgroundColor = useMemo(() => {
		return (theme: Theme) => {
			switch (true) {
				case slot.info?.channel === "scroll_booker":
					return "slotBookedScrollBooker.main";
				case slot.info?.channel === "own_client":
					return "slotBookedOwnClient.main";
				default:
					return theme.palette.background.paper;
			}
		};
	}, [slot]);

	const containerStyles = useMemo(() => {
		return (theme: Theme) => ({
			top: topOffset + 5,
			left: 0,
			right: 0,
			position: "absolute",
			overflow: "hidden",
			mx: 1,
			borderRadius: 0.5,
			height: eventHeight - 10,
			backgroundColor: getBackgroundColor(theme),
		});
	}, [topOffset, eventHeight, getBackgroundColor]);

	return <Box sx={(theme: Theme) => containerStyles(theme)}>{renderEvent}</Box>;
}
