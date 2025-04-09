import moment, { MomentInput } from "moment";

const LONG_DATE_FORMAT = "YYYY-MM-DD hh:mm:ss.SSS";
const SHORT_DATE_FORMAT = "YYYY-MM-DD";
const DATE_FORMAT = "YYYY-MM-DD HH:mm";
const FILE_DATE_FORMAT = "YYYY-MM-DD-HHmmss";
const DASH_FORMAT = "DD/MM/YYYY";

export const longFormatDate = (date: MomentInput) =>
	moment(date).format(LONG_DATE_FORMAT);
export const formatShortDate = (date: MomentInput) =>
	moment(date).format(SHORT_DATE_FORMAT);
export const fileFormatDate = (date: MomentInput) =>
	moment(date).format(FILE_DATE_FORMAT);
export const dashFormatDate = (date: MomentInput) =>
	moment(date).format(DASH_FORMAT);
export const formatDate = (date: MomentInput) =>
	moment(date).format(DATE_FORMAT);
export const dateFormat = (date: MomentInput, format: string | undefined) =>
	moment(date).format(format);
export const getDateNow = () => longFormatDate(new Date());
export const UTCToString = (date: MomentInput) => {
	if (date) {
		return moment(date, "DD/MM/YYYY");
	}
	return date;
};

moment.updateLocale(moment.locale(), { invalidDate: "-" });
// all values are indicated in milliseconds
export const SECOND = 1000;
export const MINUTE = 60000;
export const HOUR = 3600000;

// check if timestamp date will expire in 10 seconds
export const isPreExpired = (timestamp: number) =>
	Date.now() > timestamp - 10 * SECOND;

// return future timestamp.
// ex: getFutureTimestamp(5, MINUTE) - will return now timestamp + 5 minutes
export const getFutureTimestamp = (count: number, unit: number) =>
	Date.now() + count * unit;
