import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ro";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"; // Importă plugin-ul

dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ro");

export default dayjs;
