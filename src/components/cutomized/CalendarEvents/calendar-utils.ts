import dayjs from "dayjs";

export const DEFAULT_START_DATE = dayjs().startOf("week").format("YYYY-MM-DD");
export const DEFAULT_END_DATE = dayjs().endOf("week").format("YYYY-MM-DD");

export const getNextDate = (date: string) =>
	dayjs(date).add(1, "week").startOf("week").format("YYYY-MM-DD");

export const getPreviousDate = (date: string) =>
	dayjs(date).subtract(1, "week").endOf("week").format("YYYY-MM-DD");
