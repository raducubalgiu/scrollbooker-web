import { Box, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { DashboardBooking } from "@/ts/models/dashboard/DashboardBooking";
import StatCard from "./StatCard";
import StatBarRow from "./StatBarRow";
import { getEngagementSourceLabelKey } from "./dashboardLabels";

type DashboardContactClicksDetailsProps = {
  data: DashboardBooking;
  periodText: string;
};

export default function DashboardContactClicksDetails({
  data,
  periodText,
}: DashboardContactClicksDetailsProps) {
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
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {t("contactClicks")}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {periodText}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            label={t("whatsappClicks")}
            value={`${data.whatsapp_clicks_count}`}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            label={t("callClicks")}
            value={`${data.call_clicks_count}`}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            label={t("profileVisits")}
            value={`${data.profile_visits_count}`}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            label={t("uniqueProfileVisitors")}
            value={`${data.unique_profile_visitors_count}`}
          />
        </Grid>
      </Grid>

      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        {t("contactClickSources")}
      </Typography>

      {data.contact_click_sources.some((source) => source.count > 0) ? (
        <Stack spacing={2}>
          {data.contact_click_sources
            .filter((source) => source.count > 0)
            .map((source) => (
              <StatBarRow
                key={source.source}
                label={t(getEngagementSourceLabelKey(source.source) ?? "channel")}
                valueText={`${source.count}`}
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
