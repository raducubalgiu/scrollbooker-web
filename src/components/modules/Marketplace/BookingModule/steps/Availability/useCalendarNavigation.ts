import { Dayjs } from "dayjs";
import dayjs from "@/lib/dayjs";
import { useMemo, useState } from "react";

export const useCalendarNavigation = (initialDate: Dayjs) => {
  const [activeDate, setActiveDate] = useState<Dayjs>(initialDate);
  const [transform, setTransform] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const today = useMemo(() => dayjs().startOf("day"), []);
  const maxDate = useMemo(() => today.add(6, "month"), [today]);

  const weeks = useMemo(() => {
    const currentStart = activeDate.startOf("week");
    const getWeekDays = (start: Dayjs) =>
      [...Array(7)].map((_, i) => start.add(i, "day"));
    return [
      getWeekDays(currentStart.subtract(7, "day")),
      getWeekDays(currentStart),
      getWeekDays(currentStart.add(7, "day")),
    ];
  }, [activeDate]);

  const handleNavigate = (direction: "prev" | "next") => {
    if (isAnimating) return;
    const targetDate =
      direction === "next"
        ? activeDate.add(7, "day")
        : activeDate.subtract(7, "day");
    const finalDate =
      direction === "prev" && targetDate.isBefore(today) ? today : targetDate;

    if (direction === "prev" && activeDate.isSame(today, "day")) return;

    setIsAnimating(true);
    setTransform(direction === "next" ? -(100 / 3) : 100 / 3);

    setTimeout(() => {
      setActiveDate(finalDate);
      setTransform(0);
      setIsAnimating(false);
    }, 400);
  };

  return {
    activeDate,
    setActiveDate,
    weeks,
    transform,
    isAnimating,
    handleNavigate,
    today,
    maxDate,
    isPrevDisabled: activeDate
      .startOf("week")
      .isSameOrBefore(today.startOf("week")),
    isNextDisabled: activeDate.startOf("week").add(7, "days").isAfter(maxDate),
  };
};
