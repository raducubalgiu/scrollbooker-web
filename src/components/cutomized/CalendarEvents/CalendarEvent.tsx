import React from "react";
import { Box, Avatar, Typography, Stack } from "@mui/material";
import { Theme } from "@mui/system";
import { Slot } from "./calendar-types";

type CalendarEventProps = {
	slot: Slot;
	eventHeight: number;
	topOffset: number;
};

export default function CalendarEvent({
	slot,
	eventHeight,
	topOffset,
}: CalendarEventProps) {
	const { is_booked } = slot || {};

	const styles = {
		constainer: {
			left: 0,
			right: 0,
			position: "absolute",
			overflow: "hidden",
			borderRadius: 0.5,
			p: 1.5,
			m: 1,
		},
		avatar: {
			width: 30,
			height: 30,
			border: "2px solid #fff",
		},
	};

	const getBgColor = (theme: Theme) => {
		switch (slot.channel) {
			case "closer_app":
				return theme.palette.primary[100];
			case "own_client":
				return theme.palette.success.main;
			default:
				return "";
		}
	};

	return (
		<Box
			sx={(theme: Theme) => ({
				height: eventHeight,
				top: topOffset,
				bgcolor: getBgColor(theme),
				...styles.constainer,
			})}
		>
			{is_booked && (
				<Box>
					<Stack
						flexDirection="row"
						alignItems="center"
						justifyContent="flex-start"
						sx={{ mb: 1.5 }}
					>
						<Avatar sx={styles.avatar} alt="Remy Sharp" />
						<Typography fontSize={15} sx={{ ml: 1.5, fontWeight: "600" }}>
							@{slot.customer?.username}
						</Typography>
					</Stack>
					<Typography fontSize={15} color="#fff">
						Durată: 09:00 - 10:00
					</Typography>
					<Typography fontSize={15} color="#fff">
						Serviciu: Tuns
					</Typography>
					<Typography fontSize={15} color="#fff">
						Preț: 100 lei
					</Typography>
				</Box>
			)}
		</Box>
	);
}
