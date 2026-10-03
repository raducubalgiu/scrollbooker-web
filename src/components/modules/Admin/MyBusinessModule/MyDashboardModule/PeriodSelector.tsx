import { Box, Chip, Stack } from "@mui/material";
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
            <Chip
              key={period}
              label={t(PERIOD_LABEL_KEYS[period])}
              onClick={() => onPeriodSelected(period)}
              color={isSelected ? "primary" : "default"}
              variant={isSelected ? "filled" : "outlined"}
              sx={{ fontWeight: 600, flexShrink: 0 }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
