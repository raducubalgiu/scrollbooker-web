import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export enum CalendarActionTypeEnum {
	GO_PREV,
	GO_NEXT,
}

type CalendarHeaderProps = {
	canGoPrev: boolean;
	canGoNext: boolean;
	title: string;
	onSetTitle: (action: CalendarActionTypeEnum) => void;
};

export default function CalendarHeader({
	canGoPrev,
	canGoNext,
	title,
	onSetTitle,
}: CalendarHeaderProps) {
	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			mb={1}
		>
			<IconButton
				size="large"
				disabled={!canGoPrev}
				onClick={() => onSetTitle(CalendarActionTypeEnum.GO_PREV)}
			>
				<ChevronLeftIcon fontSize="large" />
			</IconButton>
			<Typography fontWeight={600} sx={{ textTransform: "capitalize" }}>
				{title}
			</Typography>
			<IconButton
				size="large"
				disabled={!canGoNext}
				onClick={() => onSetTitle(CalendarActionTypeEnum.GO_NEXT)}
			>
				<ChevronRightIcon fontSize="large" />
			</IconButton>
		</Box>
	);
}
