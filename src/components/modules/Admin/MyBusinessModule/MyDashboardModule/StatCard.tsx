import { Box, Typography, alpha } from "@mui/material";

type StatCardProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

export default function StatCard({ label, value, highlight = false }: StatCardProps) {
  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        borderRadius: 2,
        border: "1px solid",
        borderColor: highlight
          ? (theme) => alpha(theme.palette.primary.main, 0.5)
          : "divider",
        background: highlight
          ? (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(
                theme.palette.primary.main,
                0.02
              )})`
          : "transparent",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 600, mb: 0.5 }}
        noWrap
      >
        {label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700 }} noWrap>
        {value}
      </Typography>
    </Box>
  );
}
