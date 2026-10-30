import { Box, Button, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { DASHBOARD_PERIODS, DashboardPeriod } from "@/hooks/useDashboardPeriod";

const PERIOD_LABEL_KEYS: Record<DashboardPeriod, string> = {
  [DashboardPeriod.SEVEN_DAYS]: "periodSevenDays",
  [DashboardPeriod.ONE_MONTH]: "periodOneMonth",
  [DashboardPeriod.THREE_MONTHS]: "periodThreeMonths",
  [DashboardPeriod.SIX_MONTHS]: "periodSixMonths",
  [DashboardPeriod.ONE_YEAR]: "periodOneYear",
};

type PeriodSelectorProps = {
  selectedPeriod: DashboardPeriod;
  onPeriodSelected: (period: DashboardPeriod) => void;
};

export default function PeriodSelector({
  selectedPeriod,
  onPeriodSelected,
}: PeriodSelectorProps) {
  const t = useTranslations("myDashboard");

  return (
    <Box sx={{ overflowX: "auto", pb: 1, mb: 2 }}>
      <Stack direction="row" spacing={1}>
        {DASHBOARD_PERIODS.map((period) => {
          const isSelected = period === selectedPeriod;

          return (
            <Button
              key={period}
              disableElevation
              size="small"
              variant={isSelected ? "contained" : "outlined"}
              onClick={() => onPeriodSelected(period)}
              sx={{
                bgcolor: isSelected ? "primary.main" : "transparent",
                color: isSelected ? "common.white" : "text.primary",
                borderColor: isSelected ? "primary.main" : "divider",
                borderWidth: 1,
              }}
            >
              {t(PERIOD_LABEL_KEYS[period])}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}
