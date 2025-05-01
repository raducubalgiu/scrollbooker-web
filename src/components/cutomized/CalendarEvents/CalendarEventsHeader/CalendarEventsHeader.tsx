import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { Stack, Typography } from "@mui/material";
import { DayInfo } from "../calendar-utils/calendar-types";
import CalendarEventsHeaderCheckbox from "./CalendarEventsHeaderCheckbox";

type CalendarEventsHeaderProps = {
	days: DayInfo[] | undefined;
};

export default function CalendarEventsHeader({
	days,
}: CalendarEventsHeaderProps) {
	//const topOffset = isEmpty(blockedSlots) ? 100 : 150;

	const styles = {
		container: {
			position: "sticky",
			top: 100,
			zIndex: 10,
		},
		fakeCol: {
			width: 80,
			borderBottom: "1px solid",
			borderColor: "border.main",
			backgroundColor: "surface.200",
		},
		day: {
			backgroundColor: "surface.200",
			position: "relative",
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			display: "flex",
			borderTop: "1px solid",
			borderLeft: "1px solid",
			borderBottom: "1px solid",
			borderColor: "border.main",
			padding: 1,
			"&:last-child": {
				borderRight: "1px solid",
				borderColor: "border.main",
			},
		},
	};

	return (
		<Grid container sx={styles.container}>
			<Grid sx={styles.fakeCol} />
			{(days ?? []).map((day, i) => (
				<Grid key={i} sx={styles.day}>
					<Stack
						justifyContent="space-between"
						alignItems="center"
						flexDirection="row"
						sx={{ flexGrow: 1, backgroundColor: "surface.200" }}
					>
						<Stack
							flexDirection="row"
							alignItems="center"
							justifyContent="center"
							flex={1}
							sx={{ backgroundColor: "surface.200" }}
						>
							<Typography variant="subtitle2" fontWeight={600} sx={{ mr: 1.5 }}>
								{dayjs(day.date).format("ddd, MMM D")}
							</Typography>
						</Stack>
						<CalendarEventsHeaderCheckbox day={day} />
					</Stack>
				</Grid>
			))}
		</Grid>
	);
}
