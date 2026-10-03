import { Box, LinearProgress, Stack, Typography } from "@mui/material";

type StatBarRowProps = {
  label: string;
  valueText: string;
  percentage: number;
};

export default function StatBarRow({ label, valueText, percentage }: StatBarRowProps) {
  const safePercentage = Number.isFinite(percentage)
    ? Math.min(Math.max(percentage, 0), 100)
    : 0;

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 0.75 }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {valueText}
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={safePercentage}
        sx={{
          height: 8,
          borderRadius: 1,
          bgcolor: "action.hover",
          "& .MuiLinearProgress-bar": { borderRadius: 1 },
        }}
      />
    </Box>
  );
}
