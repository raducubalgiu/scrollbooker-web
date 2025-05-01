import React from "react";
import { Stack } from "@mui/material";

type CalendarEventDisabledProps = { height: number; label: string };

export default function CalendarEventDisabled({
	height,
	label,
}: CalendarEventDisabledProps) {
	return (
		<Stack
			justifyContent="center"
			alignItems="center"
			flexDirection="row"
			height={height}
			width="100%"
			sx={theme => ({
				bgcolor: theme.palette.divider,
				opacity: 0.4,
			})}
		>
			{label}
		</Stack>
	);
}
