"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Card, CardContent, Paper } from "@mui/material";
import roLocale from "@fullcalendar/core/locales/ro";
import { styled, Typography } from "@mui/material";
import { useState } from "react";

const CalendarWrapper = styled("div")`
	.fc {
		//background-color: #f0f0f0 !important;
	}

	.fc-header-toolbar {
		//background-color: #ffffff !important;
	}

	.fc-daygrid-day {
		background-color: #ffffff !important;
	}

	.fc-timegrid-slot {
		padding: 20px !important;
	}

	.fc-day-sat,
	.fc-day-sun {
		background-color: #121212 !important;
	}

	.fc-daygrid-day-frame {
	}

	.fc-event {
		background-color: #3498db !important;
		color: white !important;
	}
`;

const renderEventInfo = eventInfo => {
	return (
		<Card>
			<CardContent>
				<Typography>{eventInfo.event.title}</Typography>
				<Typography>Other Information</Typography>
			</CardContent>
		</Card>
	);
};

export default function Calendar() {
	const [view, setView] = useState("timeGridWeek");

	return (
		<Paper sx={{ p: 2.5 }}>
			<CalendarWrapper>
				<FullCalendar
					plugins={[timeGridPlugin]}
					initialView="timeGridDay"
					slotMinTime="08:00:00"
					slotMaxTime="18:00:00"
					slotDuration="01:00:00"
					slotLabelInterval="01:00:00"
					slotLabelFormat={{
						hour: "2-digit",
						minute: "2-digit",
						hour12: false,
					}}
					allDaySlot={false}
					events={[
						{
							title: "Meething",
							start: "2025-03-30T14:00:00",
							end: "2025-03-30T14:30:00",
						},
					]}
					contentHeight="auto"
					dayHeaderFormat={{ weekday: "long", day: "2-digit", month: "short" }}
					firstDay={1}
					locales={[roLocale]}
					eventContent={renderEventInfo}
				/>
			</CalendarWrapper>
		</Paper>
	);
}
