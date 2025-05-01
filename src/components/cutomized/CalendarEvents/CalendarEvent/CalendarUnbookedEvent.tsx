import React, { useMemo } from "react";
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

type CalendarUnbookedEventProps = {
	slot: SlotType;
	height: number;
};

export default function CalendarUnbookedEvent({
	slot,
	height,
}: CalendarUnbookedEventProps) {
	const { is_blocked } = slot;

	const styles = useMemo(() => {
		return () => ({
			height,
			p: 1,
			position: "relative",
			opacity: is_blocked ? 0.4 : 1,
			bgcolor: is_blocked ? "surface.200" : "background.paper",
			borderBottom: "1px solid",
			borderColor: "border.main",
		});
	}, [is_blocked, height]);

	const tooltipTitle = is_blocked
		? "Deblochează acest slot"
		: "Blochează acest slot";

	return (
		<Box sx={styles}>
			<Stack alignItems="flex-end">
				<Tooltip title={tooltipTitle}>
					<Checkbox checked={is_blocked} />
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
					{!is_blocked && (
						<Tooltip title="Adaugă o programare">
							<IconButton>
								<AddCircleOutlinedIcon fontSize="large" color="primary" />
							</IconButton>
						</Tooltip>
					)}
					{is_blocked && <Typography>Slot Blocat</Typography>}
				</Stack>
			</Box>
		</Box>
	);
}
