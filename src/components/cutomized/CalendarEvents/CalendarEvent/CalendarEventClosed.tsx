import React from "react";
import { Stack, StackProps, Typography } from "@mui/material";

type CalendarEventClosedProps = { height: number } & StackProps;

export default function CalendarEventClosed({
	height,
	...props
}: CalendarEventClosedProps) {
	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			height={height}
			bgcolor="#3b1111"
			{...props}
		>
			<Typography sx={{ textAlign: "center", opacity: 0.4 }}>Închis</Typography>
		</Stack>
	);
}
