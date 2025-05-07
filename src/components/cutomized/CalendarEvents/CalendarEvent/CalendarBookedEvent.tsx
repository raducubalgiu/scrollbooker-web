import { Box, Stack, Avatar, Typography, Button } from "@mui/material";
import { shortTimeFormat } from "@/utils/date-utils-dayjs";
import { useState } from "react";
import { SlotType } from "../calendar-types";
import CalendarEventCancelModal from "../CalendarEventsModals/CalendarEventCancelModal";
import dayjs from "dayjs";

type CalendarBookedEventProps = {
	slot: SlotType;
};

export default function CalendarBookedEvent({
	slot,
}: CalendarBookedEventProps) {
	const [open, setOpen] = useState(false);
	const { customer, product, currency } = slot?.info || {};
	const { start_date_locale, end_date_locale } = slot;
	const isPast = dayjs().isAfter(dayjs(slot.start_date_locale));

	const styles = {
		avatar: {
			width: 30,
			height: 30,
			border: "2px solid #fff",
		},
		cancelContainer: {
			position: "absolute",
			bottom: 5,
			left: 2.5,
			right: 2.5,
		},
	};

	const interval = `${shortTimeFormat(start_date_locale)} - ${shortTimeFormat(end_date_locale)}`;

	return (
		<>
			<CalendarEventCancelModal
				open={open}
				slot={slot}
				handleClose={() => setOpen(false)}
			/>
			<Box p={1} overflow="hidden">
				<Stack flexDirection="row" alignItems="center" sx={{ mb: 1.5 }}>
					<Avatar sx={styles.avatar} alt="Remy Sharp" />
					<Box>
						<Typography fontSize={15} sx={{ ml: 1, fontWeight: "600" }}>
							{customer?.fullname}
						</Typography>
						{customer?.username && (
							<Typography fontSize={15} sx={{ ml: 1, color: "text.secondary" }}>
								@{customer?.username}
							</Typography>
						)}
					</Box>
				</Stack>
				<Typography fontSize={15} color="#fff">
					Interval: {interval}
				</Typography>
				<Typography fontSize={15} color="#fff">
					Produs: {product?.product_name}
				</Typography>
				<Typography fontSize={15} color="#fff">
					Preț: {product?.product_price_with_discount} {currency?.name}
				</Typography>
				{!isPast && (
					<Stack sx={styles.cancelContainer}>
						<Button
							color="secondary"
							variant="contained"
							onClick={() => setOpen(true)}
						>
							Anulează
						</Button>
					</Stack>
				)}
			</Box>
		</>
	);
}
