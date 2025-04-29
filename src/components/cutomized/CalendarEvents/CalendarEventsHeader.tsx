import React from "react";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { Stack, Typography, Box, Checkbox, Tooltip } from "@mui/material";
import { DayInfo } from "./calendar-types";

type CalendarEventsHeaderProps = {
	days: DayInfo[] | undefined;
};

export default function CalendarEventsHeader({
	days,
}: CalendarEventsHeaderProps) {
	const styles = {
		container: { position: "sticky", top: 100, zIndex: 5, bgcolor: "#212121" },
		fakeCol: {
			width: 80,
			borderBottom: "1px solid rgba(81, 81, 81, 1)",
			bgcolor: "#212121",
		},
		day: {
			position: "relative",
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			display: "flex",
			borderTop: "1px solid rgba(81, 81, 81, 1)",
			borderLeft: "1px solid rgba(81, 81, 81, 1)",
			borderBottom: "1px solid rgba(81, 81, 81, 1)",
			padding: 2.5,
			"&:last-child": {
				borderRight: "1px solid rgba(81, 81, 81, 1)",
			},
			bgcolor: "#212121",
		},
	};

	return (
		<Grid container sx={styles.container}>
			<Grid sx={styles.fakeCol} />
			{(days ?? []).map((day, i) => (
				<Grid key={i} sx={styles.day}>
					<Stack justifyContent="center" alignItems="center">
						<Typography
							variant="subtitle2"
							fontWeight={600}
							sx={{ textAlign: "center" }}
						>
							{dayjs(day.date).format("ddd, MMM D")}
						</Typography>
						<Box>
							{!day.is_closed && (
								<Tooltip title="Poți bloca toate sloturile disponibile din această zi">
									<Checkbox />
								</Tooltip>
							)}
						</Box>
					</Stack>
				</Grid>
			))}
		</Grid>
	);
}
