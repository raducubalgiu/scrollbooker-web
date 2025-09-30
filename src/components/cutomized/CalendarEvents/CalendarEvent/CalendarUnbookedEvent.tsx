import React, { ChangeEvent, memo, useEffect, useMemo, useState } from "react";
import {
	Box,
	Stack,
	Tooltip,
	IconButton,
	Typography,
	Checkbox,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import dayjs from "dayjs";
import { timeIntervalFormat } from "@/utils/date-utils-dayjs";
import CalendarEventsBlockModal, {
	BlockUpdater,
} from "../CalendarEventsModals/CalendarEventsBlockModal";
import { useUserClientSession } from "@/lib/auth/get-user-client";
import { useCalendarEventsContext } from "@/providers/CalendarEventsProvider";
import { toast } from "react-toastify";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import CalendarEventsCreateModal from "../CalendarEventsModals/CreateEventsCreateModal";
import { useMutate } from "@/hooks/useHttp";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import { CalendarEventsSlotType } from "@/ts/models/Calendar/CalendarEventsType";

const messages = [
	{ value: "Am o programare la medic", name: "Am o programare la medic" },
	{ value: "Probleme personale", name: "Probleme personale" },
	{ value: "Altele", name: "Altele" },
];

type CalendarUnbookedEventProps = {
	slot: CalendarEventsSlotType;
	height: number;
};

function CalendarUnbookedEvent({ slot, height }: CalendarUnbookedEventProps) {
	const { start_date_locale, end_date_locale, start_date_utc, end_date_utc } =
		slot;
	const { updateSlot } = useCalendarEventsContext();
	const { userId } = useUserClientSession();
	const [open, setOpen] = useState(false);
	const [openBlockSlot, setOpenBlockSlot] = useState(false);
	const [openUnblockSlot, setOpenUnblockSlot] = useState(false);
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
			bgcolor:
				isBlocked && !openBlockSlot ? "slotBlocked.main" : "background.paper",
		});
	}, [isBlocked, height, openBlockSlot]);

	const tooltipTitle = isBlocked
		? "Deblochează acest slot"
		: "Blochează acest slot";

	const isPast = dayjs().isAfter(dayjs(start_date_locale));
	const hasBlockMessage = !message || message === "Altele";

	const title = `Data: ${dayjs(start_date_locale).format("DD MMM YYYY")}, Slot: ${timeIntervalFormat(start_date_locale, end_date_locale)}`;
	const updater: BlockUpdater = [
		{ startDate: start_date_utc, endDate: end_date_utc, userId },
	];

	const { mutate: handleUnblock, isPending } = useMutate({
		key: ["unlblock-slot"],
		url: "/api/calendar/unblock-appointment",
		options: {
			onSuccess: () => {
				updateSlot({
					...slot,
					id: null,
					is_blocked: false,
					info: null,
				});
				toast.success("Slotul a fost deblocat cu succes");
				setOpenUnblockSlot(false);
			},
		},
	});

	const handleUpdateBlockSlot = (updatedMessage: string) => {
		updateSlot({
			...slot,
			is_blocked: true,
			info: {
				channel: "own_client",
				service_name: "",
				product: {
					product_name: "",
					product_discount: 0,
					product_full_price: 0,
					product_price_with_discount: 0,
				},
				currency: null,
				customer: null,
				message: updatedMessage,
			},
		});
		toast.success("Datele au fost salvate cu succes");
		setOpenBlockSlot(false);
	};

	const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		setIsBlocked(e.target.checked);

		if (e.target.checked) {
			setOpenBlockSlot(true);
		} else {
			setOpenUnblockSlot(true);
		}
	};

	const checkbox = (
		<CustomStack>
			<Typography fontSize={12.5} color="gray" ml={1}>
				{timeIntervalFormat(start_date_locale, end_date_locale)}
			</Typography>
			<Tooltip title={tooltipTitle}>
				<Checkbox
					checked={isBlocked}
					onChange={handleCheckbox}
					color="default"
				/>
			</Tooltip>
		</CustomStack>
	);

	return (
		<>
			<ConfirmationModal
				title={title}
				open={openUnblockSlot}
				handleClose={() => setOpenUnblockSlot(false)}
				handleSubmit={() =>
					handleUnblock({ startDate: start_date_utc, endDate: end_date_utc })
				}
				message="Ești sigur că dorești să deblochezi acest slot?"
				isLoading={isPending}
			/>
			<CalendarEventsCreateModal
				openCreate={open}
				handleClose={() => setOpen(false)}
				slot={slot}
			/>
			<CalendarEventsBlockModal
				title={title}
				description="Ești sigur că dorești să blochezi acest slot?"
				open={openBlockSlot}
				handleClose={() => {
					setOpenBlockSlot(false);
					setIsBlocked(isBlocked => !isBlocked);
				}}
				updater={updater}
				messages={messages}
				onSuccessUpdate={handleUpdateBlockSlot}
			/>
			<Box sx={styles}>
				{!isPast && checkbox}
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

export default memo(CalendarUnbookedEvent);
