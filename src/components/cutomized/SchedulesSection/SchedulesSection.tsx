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
  endTime?: string | null
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

export default function SchedulesSection({ schedules }: SchedulesSectionProps) {
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
    <Box>
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
            sx={{ mb: idx < schedules.length - 1 ? 2 : 0 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center">
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: statusBg,
                  }}
                />
                <Box sx={{ width: 12 }} />
                <Typography
                  sx={{
                    fontWeight: isToday ? 800 : 400,
                    lineHeight: 1.75,
                  }}
                  variant="h6"
                >
                  {daysMap[s.day_of_week] ?? s.day_of_week}
                </Typography>
              </Stack>

              <Typography variant="h6" sx={{ fontWeight: isToday ? 800 : 400 }}>
                {text}
              </Typography>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
}
