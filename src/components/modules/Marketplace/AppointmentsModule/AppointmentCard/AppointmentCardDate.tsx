import { Stack, Typography } from "@mui/material";

type AppointmentCardDateProps = {
  day: string;
  month: string;
  startTime: string;
};

export default function AppointmentCardDate({
  day,
  month,
  startTime,
}: AppointmentCardDateProps) {
  return (
    <Stack alignItems="center" justifyContent="center" sx={styles.container}>
      <Typography sx={styles.day}>{day}</Typography>
      <Typography sx={styles.month}>{month}</Typography>
      <Typography sx={styles.startTime}>{startTime}</Typography>
    </Stack>
  );
}

const styles = {
  container: {
    minWidth: 84,
    px: 1.5,
    py: 1.25,
    borderRadius: "18px",
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  },
  day: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },
  month: {
    fontSize: 13,
    color: "text.secondary",
    textTransform: "capitalize",
  },
  startTime: {
    mt: 0.75,
    fontSize: 13,
    fontWeight: 600,
    color: "text.primary",
  },
};
