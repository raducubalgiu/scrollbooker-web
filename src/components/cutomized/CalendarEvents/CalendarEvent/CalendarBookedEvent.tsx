import { Box, Stack, Avatar, Typography } from "@mui/material";
import { AppointmentInfoType } from "../calendar-utils/calendar-types";

type CalendarBookedEventProps = {
	info: AppointmentInfoType | null;
};

export default function CalendarBookedEvent({
	info,
}: CalendarBookedEventProps) {
	const { customer, service_name, product_price, currency } = info || {};

	const styles = {
		avatar: {
			width: 30,
			height: 30,
			border: "2px solid #fff",
		},
	};

	// const containerStyles = useMemo(() => {
	// 	return (theme: Theme) => ({
	// 		backgroundColor:
	// 			channel === "scroll_booker" ? theme.palette.primary[300] : "#2E7D32",
	// 	});
	// }, [channel]);

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
				Durată: 09:00 - 10:00
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
