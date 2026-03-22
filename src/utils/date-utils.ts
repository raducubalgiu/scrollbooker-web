import dayjs, { ConfigType, Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const LONG_DATE_FORMAT = "YYYY-MM-DD hh:mm:ss.SSS";
const SHORT_DATE_FORMAT = "YYYY-MM-DD";
const DATE_FORMAT = "YYYY-MM-DD HH:mm";
const FILE_DATE_FORMAT = "YYYY-MM-DD-HHmmss";
const DASH_FORMAT = "DD/MM/YYYY";

const formatOrDash = (d: Dayjs, format: string) =>
  d.isValid() ? d.format(format) : "-";

export const longFormatDate = (date: ConfigType) =>
  formatOrDash(dayjs(date), LONG_DATE_FORMAT);
export const formatShortDate = (date: ConfigType) =>
  formatOrDash(dayjs(date), SHORT_DATE_FORMAT);
export const fileFormatDate = (date: ConfigType) =>
  formatOrDash(dayjs(date), FILE_DATE_FORMAT);
export const dashFormatDate = (date: ConfigType) =>
  formatOrDash(dayjs(date), DASH_FORMAT);
export const formatDate = (date: ConfigType) =>
  formatOrDash(dayjs(date), DATE_FORMAT);
export const dateFormat = (date: ConfigType, format: string | undefined) =>
  formatOrDash(dayjs(date), format ?? DATE_FORMAT);
export const getDateNow = () => longFormatDate(new Date());

// similar behavior to previous UTCToString: if a date is provided, parse using DD/MM/YYYY
export const UTCToString = (date: ConfigType): Dayjs | ConfigType => {
  if (date) {
    return dayjs(date, DASH_FORMAT);
  }
  return date;
};

// keep same exported time constants
export const SECOND = 1000;
export const MINUTE = 60000;
export const HOUR = 3600000;

// check if timestamp date will expire in 10 seconds
export const isPreExpired = (timestamp: number) =>
  Date.now() > timestamp - 10 * SECOND;

export const getFutureTimestamp = (count: number, unit: number) =>
  Date.now() + count * unit;
