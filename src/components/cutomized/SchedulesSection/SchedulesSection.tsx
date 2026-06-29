import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { Box, Stack, Typography } from "@mui/material";

type SchedulesSectionProps = {
	schedules: Schedule[] | undefined;
};

enum WorkScheduleStatus {
	CLOSED = "CLOSED",
	SHORT = "SHORT",
	FULL = "FULL",
}

const daysMap: Record<string, string> = {
	Monday: "Luni",
	Tuesday: "Marți",
	Wednesday: "Miercuri",
	Thursday: "Joi",
	Friday: "Vineri",
	Saturday: "Sâmbătă",
	Sunday: "Duminică",
};

function formatTime(time?: string | null) {
	if (!time) return "";
	const parts = time.split(":");
	if (parts.length < 2) return time;
	return `${parts[0]}:${parts[1]}`;
}

function getWorkScheduleStatus(
	startTime?: string | null,
	endTime?: string | null,
) {
	if (!startTime || !endTime) return WorkScheduleStatus.CLOSED;
	const [sh, sm] = startTime.split(":");
	const [eh, em] = endTime.split(":");
	const start = Number(sh) + Number(sm) / 60;
	const end = Number(eh) + Number(em) / 60;
	let duration = end - start;
	if (duration < 0) duration += 24;
	if (duration >= 8) return WorkScheduleStatus.FULL;
	if (duration >= 1) return WorkScheduleStatus.SHORT;
	return WorkScheduleStatus.CLOSED;
}

export function SchedulesSection({ schedules }: SchedulesSectionProps) {
	const todayIndex = new Date().getDay();
	const dayNames = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const todayName = dayNames[todayIndex];

	return (
		<Box sx={{ maxWidth: { xs: "100%", sm: "450px", md: "100%" } }}>
			{schedules?.map((s, idx) => {
				const text = !s.start_time
					? "Închis"
					: `${formatTime(s.start_time)} - ${formatTime(s.end_time)}`;
				const isToday = s.day_of_week === todayName;
				const status = getWorkScheduleStatus(s.start_time, s.end_time);
				const statusBg =
					status === WorkScheduleStatus.CLOSED
						? "#CCCCCC"
						: status === WorkScheduleStatus.SHORT
							? "#FBBF24"
							: "#16A34A";

				return (
					<Box
						key={`${s.day_of_week}-${idx}`}
						sx={{
							mb: idx < schedules.length - 1 ? 1.5 : 0,
							p: isToday ? 1 : 0,
							px: isToday ? 1.5 : 0,
							borderRadius: isToday ? 2 : 0,
							backgroundColor: isToday ? "action.selected" : "transparent",
						}}
					>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							gap={2}
						>
							<Stack direction="row" alignItems="center" minWidth={0}>
								<Box
									sx={{
										width: 8,
										height: 8,
										borderRadius: "50%",
										backgroundColor: statusBg,
										flexShrink: 0,
									}}
								/>
								<Box sx={{ width: 12 }} />
								<Typography
									noWrap
									sx={{
										fontWeight: isToday ? 700 : 400,
										lineHeight: 1.5,
										fontSize: { xs: 16, md: 18 },
									}}
								>
									{daysMap[s.day_of_week] ?? s.day_of_week}
								</Typography>
							</Stack>

							<Typography
								sx={{
									fontWeight: isToday ? 700 : 400,
									fontSize: { xs: 15, md: 17 },
									whiteSpace: "nowrap",
								}}
							>
								{text}
							</Typography>
						</Stack>
					</Box>
				);
			})}
		</Box>
	);
}

export default SchedulesSection;
