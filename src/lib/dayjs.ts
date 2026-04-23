import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ro";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ro");

export default dayjs;
