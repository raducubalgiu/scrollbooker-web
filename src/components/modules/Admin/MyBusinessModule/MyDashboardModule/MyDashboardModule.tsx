"use client";

import { useState } from "react";
import { Box, Button, CircularProgress, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { useGetDashboardBookings } from "@/controllers/dashboard/dashboard.controller";
import { useDashboardPeriod } from "@/hooks/useDashboardPeriod";
import PeriodSelector from "./PeriodSelector";
import DashboardBookingDetails from "./DashboardBookingDetails";
import DashboardBookingSources from "./DashboardBookingSources";

enum DashboardTab {
  BOOKINGS = "bookings",
  POSTS = "posts",
}

export default function MyDashboardModule() {
  const t = useTranslations("myDashboard");
  const [tab, setTab] = useState<DashboardTab>(DashboardTab.BOOKINGS);
  const { period, setPeriod, startDate, endDate, periodText } = useDashboardPeriod();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetDashboardBookings({ startDate, endDate });

  return (
    <MainLayout
      title={t("title")}
      showHeader
      hideAction
      sx={{ bgcolor: "background.paper" }}
    >
      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        sx={{ mb: 2.5, borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Tab label={t("tabBookings")} value={DashboardTab.BOOKINGS} />
        <Tab label={t("tabPosts")} value={DashboardTab.POSTS} />
      </Tabs>

      {tab === DashboardTab.BOOKINGS && (
        <Box>
          <PeriodSelector selectedPeriod={period} onPeriodSelected={setPeriod} />

          {isLoading && (
            <Stack alignItems="center" sx={{ py: 8 }}>
              <CircularProgress />
            </Stack>
          )}

          {!isLoading && isError && (
            <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
              <Typography color="text.secondary">{t("errorMessage")}</Typography>
              <Button variant="outlined" onClick={() => refetch()}>
                {t("retry")}
              </Button>
            </Stack>
          )}

          {!isLoading && !isError && data && (
            <Stack spacing={2.5}>
              <DashboardBookingDetails data={data} periodText={periodText} />
              <DashboardBookingSources sources={data.sources} />
            </Stack>
          )}
        </Box>
      )}

      {tab === DashboardTab.POSTS && (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <Typography color="text.secondary">{t("postsComingSoon")}</Typography>
        </Stack>
      )}
    </MainLayout>
  );
}
