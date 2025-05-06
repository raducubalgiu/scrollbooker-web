import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/timezone";

dayjs.extend(timezone);
dayjs.extend(utc);

export const shortPrettyDate = (date: string) =>
	dayjs(date).format("D MMMM YY");
export const shortTimeFormat = (dateTime: string) =>
	dayjs(dateTime).format("HH:mm");
export const timeIntervalFormat = (startTime: string, endTime: string) =>
	`${shortTimeFormat(startTime)} - ${shortTimeFormat(endTime)}`;

export const timeWithOffset = (
	timeStr: string,
	offsetSeconds: number,
	format: string = "HH:mm:ssZ"
) => {
	const dummyDateTime = `1970-01-01T${timeStr}`;
	const parsedTime = dayjs.utc(dummyDateTime);
	const adjustedTime = parsedTime.add(offsetSeconds, "seconds");
	return adjustedTime.format(format);
};

export const timezoneOffsetInterval = (specificTimezone: string) => {
	return dayjs().tz(specificTimezone).format("Z");
};

export const timezoneOffsetSeconds = (specificTimezone: string) => {
	return dayjs().tz(specificTimezone).utcOffset() * 60;
};
