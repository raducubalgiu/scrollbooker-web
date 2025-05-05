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
import { SlotType } from "../calendar-types";
import CreateEventModal from "./CreateEventModal";
import dayjs from "dayjs";
import { shortTimeFormat } from "@/utils/date-utils-dayjs";
import CalendarEventsBlockModal, {
	BlockUpdater,
} from "../CalendarEventsModals/CalendarEventsBlockModal";
import { useUserClientSession } from "@/lib/auth/get-user-client";
import { useCalendarEventsContext } from "@/providers/CalendarEventsProvider";
import { toast } from "react-toastify";

type CalendarUnbookedEventProps = {
	slot: SlotType;
	height: number;
};

export default function CalendarUnbookedEvent({
	slot,
	height,
}: CalendarUnbookedEventProps) {
	const { updateSlot } = useCalendarEventsContext();
	const { userId } = useUserClientSession();
	const [open, setOpen] = useState(false);
	const [openBlockSlot, setOpenBlockSlot] = useState(false);
	const [isBlocked, setIsBlocked] = useState(slot.is_blocked);
	const { message } = slot?.info || {};

	useEffect(() => {
		setIsBlocked(slot.is_blocked);
	}, [slot.is_blocked]);

	const styles = useMemo(() => {
		return () => ({
			height,
			p: 1,
			position: "relative",
			bgcolor: isBlocked && !openBlockSlot ? "#3b1111" : "background.paper",
		});
	}, [isBlocked, height, openBlockSlot]);

	const tooltipTitle = isBlocked
		? "Deblochează acest slot"
		: "Blochează acest slot";

	const interval = `${shortTimeFormat(slot.start_date_locale)} - ${shortTimeFormat(slot.end_date_locale)}`;
	const isPast = dayjs().isAfter(dayjs(slot.start_date_locale));
	const hasBlockMessage = !message || message === "Altele";

	const title = `Data: ${dayjs(slot.start_date_locale).format("DD MMM YYYY")}, Slot: ${shortTimeFormat(slot.start_date_locale)}`;
	const updater: BlockUpdater = [
		{ startDate: slot.start_date_utc, endDate: slot.end_date_utc, userId },
	];

	const messages = [
		{ value: "Zi legală liberă", name: "Zi legală liberă" },
		{ value: "Concediu de odihnă", name: "Concediu de odihnă" },
		{ value: "Concediu medical", name: "Concediu medical" },
		{ value: "Altele", name: "Altele" },
	];

	const handleUpdateSlot = (updatedMessage: string) => {
		updateSlot({
			...slot,
			is_blocked: true,
			info: {
				channel: "own_client",
				service_name: "",
				product_price: 0,
				currency: "",
				customer: null,
				message: updatedMessage,
			},
		});
		toast.success("Datele au fost salvate cu succes");
		setOpenBlockSlot(false);
	};

	return (
		<>
			<CreateEventModal
				openCreate={open}
				handleClose={() => setOpen(false)}
				slot={slot}
			/>
			<CalendarEventsBlockModal
				title={title}
				open={openBlockSlot}
				handleClose={() => {
					setOpenBlockSlot(false);
					setIsBlocked(isBlocked => !isBlocked);
				}}
				updater={updater}
				messages={messages}
				onSuccessUpdate={handleUpdateSlot}
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
									onChange={e => {
										setOpenBlockSlot(true);
										setIsBlocked(e.target.checked);
									}}
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
								{hasBlockMessage ? "Slot Vacant" : message}
							</Typography>
						)}
						{isBlocked && !isPast && (
							<Typography sx={{ opacity: 0.4 }}>
								{hasBlockMessage ? "Slot Blocat" : message}
							</Typography>
						)}
					</Stack>
				</Box>
			</Box>
		</>
	);
}
