"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import dayjs from "@/lib/dayjs";

const DATE_PARAM = "date";
const EMPLOYEE_PARAM = "employee_id";
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

type CalendarUrlUpdate = {
  date?: dayjs.Dayjs | null;
  employeeId?: number | null;
};

export const useCalendarUrlState = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dateParam = searchParams.get(DATE_PARAM);
  const employeeParam = searchParams.get(EMPLOYEE_PARAM);

  const date = useMemo(() => {
    if (dateParam && DATE_PATTERN.test(dateParam) && dayjs(dateParam).isValid()) {
      return dayjs(dateParam);
    }
    return dayjs();
  }, [dateParam]);

  const employeeId = useMemo(() => {
    const parsed = Number(employeeParam);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
  }, [employeeParam]);

  const setUrlState = useCallback(
    (update: CalendarUrlUpdate) => {
      const params = new URLSearchParams(searchParams.toString());

      if (update.date !== undefined) {
        if (update.date) params.set(DATE_PARAM, update.date.format("YYYY-MM-DD"));
        else params.delete(DATE_PARAM);
      }

      if (update.employeeId !== undefined) {
        if (update.employeeId) params.set(EMPLOYEE_PARAM, String(update.employeeId));
        else params.delete(EMPLOYEE_PARAM);
      }

      const query = params.toString();
      window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
    },
    [pathname, searchParams]
  );

  return { date, employeeId, setUrlState };
};
