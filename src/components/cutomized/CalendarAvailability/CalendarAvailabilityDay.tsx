import React, { memo } from "react";
import Grid from "@mui/material/Grid2";
import { IconButton, Badge, Box, Skeleton } from "@mui/material";

type CalendarAvailabilityDayProps = {
	day: number;
	isToday: boolean;
	isCurrentMonth: boolean;
	isAvailable: boolean;
	isLoading: boolean;
};

function CalendarAvailabilityDay({
	day,
	isToday,
	isCurrentMonth,
	isAvailable,
	isLoading,
}: CalendarAvailabilityDayProps) {
	const styles = {
		container: {
			aspectRatio: "1 / 1",
			border: "1px solid",
			borderColor: isToday && !isLoading ? "grey.500" : "transparent",
			borderRadius: "50%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			position: "relative",
		},
		button: {
			borderRadius: "50%",
			flex: 1,
			width: "100%",
			height: "100%",
			fontSize: 15,
			display: isCurrentMonth ? "block" : "none",
		},
		badge: {
			"& .MuiBadge-badge": {
				bgcolor: isAvailable ? "success.main" : "secondary.main",
				borderRadius: "50%",
				transform: "translate(150%, -150%)",
			},
		},
	};

	return (
		<Grid size={12 / 7} sx={styles.container}>
			<IconButton sx={styles.button} disabled={!isCurrentMonth || isLoading}>
				{!isLoading && (
					<Badge
						overlap="circular"
						variant="dot"
						anchorOrigin={{ vertical: "top", horizontal: "right" }}
						sx={styles.badge}
					>
						<Box>{day}</Box>
					</Badge>
				)}
				{isLoading && <Skeleton variant="circular" width={40} height={40} />}
			</IconButton>
		</Grid>
	);
}

export default memo(CalendarAvailabilityDay);
