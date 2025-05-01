import React, { useEffect, useMemo, useState, ChangeEvent } from "react";
import {
	Box,
	Stack,
	Tooltip,
	Checkbox,
	IconButton,
	Typography,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { SlotType } from "../calendar-utils/calendar-types";
import {
	BlockedDayActionEnum,
	useCalendarEventsContext,
} from "@/providers/CalendarEventsProvider";

type CalendarUnbookedEventProps = {
	dayDate: string;
	slot: SlotType;
	height: number;
};

export default function CalendarUnbookedEvent({
	dayDate,
	slot,
	height,
}: CalendarUnbookedEventProps) {
	const { handleBlockedDaysSlots } = useCalendarEventsContext();
	const [isBlocked, setIsBlocked] = useState(slot.is_blocked);

	useEffect(() => setIsBlocked(slot.is_blocked), [slot.is_blocked]);

	const styles = useMemo(() => {
		return () => ({
			height,
			p: 1,
			position: "relative",
			opacity: isBlocked ? 0.4 : 1,
			bgcolor: isBlocked ? "surface.200" : "background.paper",
			borderBottom: "1px solid",
			borderColor: "border.main",
		});
	}, [isBlocked, height]);

	const tooltipTitle = isBlocked
		? "Deblochează acest slot"
		: "Blochează acest slot";

	const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			handleBlockedDaysSlots(
				{ day: dayDate, slots: [slot] },
				BlockedDayActionEnum.ADD
			);
		} else {
			handleBlockedDaysSlots(
				{ day: dayDate, slots: [slot] },
				BlockedDayActionEnum.REMOVE
			);
		}

		setIsBlocked(e.target.checked);
	};

	return (
		<Box sx={styles}>
			<Stack alignItems="flex-end">
				<Tooltip title={tooltipTitle}>
					<Checkbox
						checked={isBlocked}
						color="primary"
						onChange={handleCheckbox}
					/>
				</Tooltip>
			</Stack>
			<Box
				position="absolute"
				top={0}
				left={0}
				right={0}
				bottom={0}
				display="flex"
				flexDirection="column"
			>
				<Stack
					flexGrow={1}
					alignItems="center"
					justifyContent="center"
					flexDirection="column"
				>
					{!isBlocked && (
						<Tooltip title="Adaugă o programare">
							<IconButton>
								<AddCircleOutlinedIcon fontSize="large" color="primary" />
							</IconButton>
						</Tooltip>
					)}
					{isBlocked && <Typography>Slot Blocat</Typography>}
				</Stack>
			</Box>
		</Box>
	);
}
