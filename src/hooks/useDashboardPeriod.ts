import { useMemo, useState } from "react";
import dayjs from "dayjs";

export enum DashboardPeriod {
  SEVEN_DAYS = "seven_days",
  ONE_MONTH = "one_month",
  THREE_MONTHS = "three_months",
  SIX_MONTHS = "six_months",
  ONE_YEAR = "one_year",
}

export const DASHBOARD_PERIODS = [
  DashboardPeriod.SEVEN_DAYS,
  DashboardPeriod.ONE_MONTH,
  DashboardPeriod.THREE_MONTHS,
  DashboardPeriod.SIX_MONTHS,
  DashboardPeriod.ONE_YEAR,
];

function getStartDate(period: DashboardPeriod, reference: dayjs.Dayjs) {
  switch (period) {
    case DashboardPeriod.SEVEN_DAYS:
      return reference.subtract(7, "day");
    case DashboardPeriod.ONE_MONTH:
      return reference.subtract(1, "month");
    case DashboardPeriod.THREE_MONTHS:
      return reference.subtract(3, "month");
    case DashboardPeriod.SIX_MONTHS:
      return reference.subtract(6, "month");
    case DashboardPeriod.ONE_YEAR:
      return reference.subtract(1, "year");
  }
}

export function useDashboardPeriod(
  initialPeriod: DashboardPeriod = DashboardPeriod.SEVEN_DAYS
) {
  const [period, setPeriod] = useState<DashboardPeriod>(initialPeriod);

  return useMemo(() => {
    const end = dayjs();
    const start = getStartDate(period, end);

    return {
      period,
      setPeriod,
      startDate: start.format("YYYY-MM-DD"),
      endDate: end.format("YYYY-MM-DD"),
      periodText: `${start.format("DD MMM")} - ${end.format("DD MMM")}`,
    };
  }, [period]);
}
