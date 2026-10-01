import { Box, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { DashboardBookingSource } from "@/ts/models/dashboard/DashboardBooking";
import StatBarRow from "./StatBarRow";
import { getSourceLabelKey } from "./dashboardLabels";

type DashboardBookingSourcesProps = {
  sources: DashboardBookingSource[];
};

export default function DashboardBookingSources({
  sources,
}: DashboardBookingSourcesProps) {
  const t = useTranslations("myDashboard");

  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        {t("bookingsSources")}
      </Typography>

      {sources.length > 0 ? (
        <Stack spacing={2}>
          {sources.map((source) => (
            <StatBarRow
              key={source.source}
              label={t(getSourceLabelKey(source.source) ?? "channel")}
              valueText={`${source.bookings_no}`}
              percentage={source.percentage}
            />
          ))}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          {t("noData")}
        </Typography>
      )}
    </Box>
  );
}
