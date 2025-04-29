import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { Stack, Typography } from "@mui/material";
import { DayInfo, SlotType } from "./calendar-types";
import { every } from "lodash";
import { BlockedSlotActionEnum } from "./useCalendarEvents";
import CalendarEventsHeaderCheckbox from "./CalendarEventsHeaderCheckbox";

type CalendarEventsHeaderProps = {
	days: DayInfo[] | undefined;
	onHandleBlockSlots: (
		slots: SlotType[],
		action: BlockedSlotActionEnum
	) => void;
};

export default function CalendarEventsHeader({
	days,
	onHandleBlockSlots,
}: CalendarEventsHeaderProps) {
	const styles = {
		container: { position: "sticky", top: 100, zIndex: 5, bgcolor: "#212121" },
		fakeCol: {
			width: 80,
			borderBottom: "1px solid rgba(81, 81, 81, 1)",
			bgcolor: "#212121",
		},
		day: {
			position: "relative",
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			display: "flex",
			borderTop: "1px solid rgba(81, 81, 81, 1)",
			borderLeft: "1px solid rgba(81, 81, 81, 1)",
			borderBottom: "1px solid rgba(81, 81, 81, 1)",
			padding: 2.5,
			"&:last-child": {
				borderRight: "1px solid rgba(81, 81, 81, 1)",
			},
			bgcolor: "#212121",
		},
	};

	return (
		<Grid container sx={styles.container}>
			<Grid sx={styles.fakeCol} />
			{(days ?? []).map((day, i) => (
				<Grid key={i} sx={styles.day}>
					<Stack
						justifyContent="flex-end"
						alignItems="center"
						flexDirection="row"
						sx={{ flexGrow: 1 }}
					>
						<Typography
							variant="subtitle2"
							fontWeight={600}
							sx={{ textAlign: "center", mr: 1.5 }}
						>
							{dayjs(day.date).format("ddd, MMM D")}
						</Typography>
						{!day.is_closed && !every(day.slots, { is_booked: true }) && (
							<CalendarEventsHeaderCheckbox
								slots={day.slots}
								defaultChecked={false}
								onHandleBlockSlots={onHandleBlockSlots}
							/>
						)}
					</Stack>
				</Grid>
			))}
		</Grid>
	);
}
