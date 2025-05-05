import React from "react";
import { Stack, Typography, IconButton, Skeleton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type CalendarAvailabilityHeaderProps = {
	month: string;
	disablePast: boolean;
	onHandlePreMonth: () => void;
	onHandleNextMonth: () => void;
	isLoading: boolean;
};

export default function CalendarAvailabilityHeader({
	month,
	disablePast,
	onHandlePreMonth,
	onHandleNextMonth,
	isLoading,
}: CalendarAvailabilityHeaderProps) {
	const displayMonth = isLoading ? <Skeleton width={100} /> : month;

	const handlers = (
		<Stack direction="row" justifyContent="center" alignItems="center">
			<IconButton
				onClick={onHandlePreMonth}
				size="large"
				disabled={disablePast}
			>
				<NavigateBeforeIcon />
			</IconButton>
			<IconButton onClick={onHandleNextMonth} size="large">
				<NavigateNextIcon />
			</IconButton>
		</Stack>
	);

	const handlersSkeleton = (
		<Stack direction="row" justifyContent="center" alignItems="center">
			<Skeleton variant="circular" width={40} height={40} />
			<Skeleton variant="circular" width={40} height={40} sx={{ ml: 1.5 }} />
		</Stack>
	);

	return (
		<Stack direction="row" justifyContent="space-between" alignItems="center">
			<Typography fontSize={18}>{displayMonth}</Typography>
			{isLoading ? handlersSkeleton : handlers}
		</Stack>
	);
}
