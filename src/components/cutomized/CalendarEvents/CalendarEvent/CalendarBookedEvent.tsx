import { Box, Stack, Avatar, Typography } from "@mui/material";
import { SlotType } from "../calendar-utils/calendar-types";
import { shortTimeFormat } from "@/utils/date-utils-dayjs";

type CalendarBookedEventProps = {
	slot: SlotType;
};

export default function CalendarBookedEvent({
	slot,
}: CalendarBookedEventProps) {
	const { customer, service_name, product_price, currency } = slot?.info || {};
	const { start_date_locale, end_date_locale } = slot;

	const styles = {
		avatar: {
			width: 30,
			height: 30,
			border: "2px solid #fff",
		},
	};

	const interval = `${shortTimeFormat(start_date_locale)} - ${shortTimeFormat(end_date_locale)}`;

	return (
		<Box p={1} overflow="hidden">
			<Stack flexDirection="row" alignItems="center" sx={{ mb: 1.5 }}>
				<Avatar sx={styles.avatar} alt="Remy Sharp" />
				<Box>
					<Typography fontSize={15} sx={{ ml: 1, fontWeight: "600" }}>
						Raducu Balgiu
					</Typography>
					<Typography fontSize={15} sx={{ ml: 1, color: "text.secondary" }}>
						@{customer?.username}
					</Typography>
				</Box>
			</Stack>
			<Typography fontSize={15} color="#fff">
				Interval: {interval}
			</Typography>
			<Typography fontSize={15} color="#fff">
				Serviciu: {service_name}
			</Typography>
			<Typography fontSize={15} color="#fff">
				Preț: {product_price} {currency}
			</Typography>
		</Box>
	);
}
