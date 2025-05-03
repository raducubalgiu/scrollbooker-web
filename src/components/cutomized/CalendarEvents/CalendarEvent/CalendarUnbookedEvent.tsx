import React, { useEffect, useMemo, useState } from "react";
import {
	Box,
	Stack,
	Tooltip,
	IconButton,
	Typography,
	Checkbox,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { SlotType } from "../calendar-utils/calendar-types";
import CreateEventModal from "./CreateEventModal";
import dayjs from "dayjs";
import { shortTimeFormat } from "@/utils/date-utils-dayjs";

type CalendarUnbookedEventProps = {
	slot: SlotType;
	height: number;
};

export default function CalendarUnbookedEvent({
	slot,
	height,
}: CalendarUnbookedEventProps) {
	const [open, setOpen] = useState(false);
	const [isBlocked, setIsBlocked] = useState(false);
	const { block_message } = slot?.info || {};

	useEffect(() => {
		setIsBlocked(slot.is_blocked);
	}, [slot.is_blocked]);

	const styles = useMemo(() => {
		return () => ({
			height,
			p: 1,
			position: "relative",
			bgcolor: isBlocked ? "#3b1111" : "background.paper",
		});
	}, [isBlocked, height]);

	const tooltipTitle = isBlocked
		? "Deblochează acest slot"
		: "Blochează acest slot";

	const interval = `${shortTimeFormat(slot.start_date_locale)} - ${shortTimeFormat(slot.end_date_locale)}`;
	const isPast = dayjs().isAfter(dayjs(slot.start_date_locale));
	const hasBlockMessage = !block_message || block_message === "Altele";

	return (
		<>
			<CreateEventModal
				openCreate={open}
				handleClose={() => setOpen(false)}
				slot={slot}
			/>
			<Box sx={styles}>
				<Stack
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
				>
					{!isPast && (
						<>
							<Typography fontSize={12.5} color="gray" ml={1}>
								{interval}
							</Typography>
							<Tooltip title={tooltipTitle}>
								<Checkbox
									checked={isBlocked}
									onChange={e => setIsBlocked(e.target.checked)}
									color="default"
								/>
							</Tooltip>
						</>
					)}
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
						sx={{ p: 1, overflow: "auto" }}
					>
						{!isBlocked && !isPast && (
							<Tooltip title="Adaugă o programare">
								<IconButton onClick={() => setOpen(true)}>
									<AddCircleOutlinedIcon fontSize="large" color="primary" />
								</IconButton>
							</Tooltip>
						)}
						{isPast && (
							<Typography fontSize={13.5} color="gray" ml={1}>
								{hasBlockMessage ? "Slot Vacant" : block_message}
							</Typography>
						)}
						{isBlocked && !isPast && (
							<Typography sx={{ opacity: 0.4 }}>
								{hasBlockMessage ? "Slot Blocat" : block_message}
							</Typography>
						)}
					</Stack>
				</Box>
			</Box>
		</>
	);
}
