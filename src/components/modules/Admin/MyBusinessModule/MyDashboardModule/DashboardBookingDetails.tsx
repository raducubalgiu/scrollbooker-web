import { Box, Grid2 as Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTranslations } from "next-intl";
import { DashboardBooking } from "@/ts/models/dashboard/DashboardBooking";
import { formatPrice } from "@/utils/formatPrice";
import StatCard from "./StatCard";
import { getChannelColor, getChannelLabelKey } from "./dashboardLabels";

type DashboardBookingDetailsProps = {
  data: DashboardBooking;
  periodText: string;
};

export default function DashboardBookingDetails({
  data,
  periodText,
}: DashboardBookingDetailsProps) {
  const t = useTranslations("myDashboard");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const channelData = data.channels.map((channel) => ({
    id: channel.channel,
    value: channel.bookings_no,
    label: t(getChannelLabelKey(channel.channel) ?? "channel"),
    color: getChannelColor(channel.channel, data.business_short_domain, theme),
  }));

  const totalChannelBookings = channelData.reduce(
    (sum, entry) => sum + entry.value,
    0
  );

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
        {t("bookingsDetails")}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {periodText}
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 6, sm: 4 }}>
          <StatCard label={t("bookings")} value={`${data.bookings_no}`} />
        </Grid>
        <Grid size={{ xs: 6, sm: 4 }}>
          <StatCard
            label={t("earnings")}
            value={`${formatPrice(data.revenue)} RON`}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4 }}>
          <StatCard label={t("finished")} value={`${data.finished_bookings_no}`} />
        </Grid>
        <Grid size={{ xs: 6, sm: 4 }}>
          <StatCard label={t("canceled")} value={`${data.cancelled_bookings_no}`} />
        </Grid>
        <Grid size={{ xs: 6, sm: 4 }}>
          <StatCard
            label={t("fromVideo")}
            value={`${formatPrice(data.revenue_from_video)} RON`}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4 }}>
          <StatCard
            label={t("scrollBookerCommission")}
            value={`${formatPrice(data.revenue_scroll_booker)} RON`}
            highlight
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          {t("channel")}
        </Typography>

        {totalChannelBookings > 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PieChart
              series={[
                {
                  data: channelData,
                  innerRadius: 50,
                  outerRadius: 70,
                  paddingAngle: 2,
                  cornerRadius: 4,
                  highlightScope: { fade: "global", highlight: "item" },
                  arcLabel: (item) => `${item.value}`,
                },
              ]}
              width={isMobile ? 260 : 320}
              height={isMobile ? 300 : 260}
              margin={{ top: 10, bottom: 70, left: 10, right: 10 }}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                },
              }}
            />
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {t("noData")}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
