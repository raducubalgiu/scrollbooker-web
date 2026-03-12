import { Box, Typography } from "@mui/material";

type DateTimeCardProps = {
  day: string | number;
  month: string;
  time: string;
};

export function DateTimeCard({ day, month, time }: DateTimeCardProps) {
  return (
    <Box
      sx={{
        width: 92,
        minWidth: 92,
        height: 132,
        borderRadius: "28px",
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          fontSize: 42,
          fontWeight: 600,
          lineHeight: 1,
          color: "text.primary",
          mb: 0.5,
        }}
      >
        {day}
      </Typography>

      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 400,
          lineHeight: 1.2,
          color: "text.secondary",
          mb: 1.5,
        }}
      >
        {month}
      </Typography>

      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 500,
          lineHeight: 1,
          color: "text.primary",
        }}
      >
        {time}
      </Typography>
    </Box>
  );
}
