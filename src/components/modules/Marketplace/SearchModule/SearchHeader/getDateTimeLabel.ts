import dayjs from "@/lib/dayjs";

type DateTimeLabelState = {
  startDate: string | null;
  startTime: string | null;
  endTime: string | null;
};

export const getDateTimeLabel = (state: DateTimeLabelState): string | null => {
  const { startDate, startTime, endTime } = state;

  const formatHourOnly = (timeString: string | null) => {
    if (!timeString) return "";
    return timeString.split(":")[0];
  };

  const startHour = formatHourOnly(startTime);
  const endHour = formatHourOnly(endTime);

  if (!startDate && startTime && endTime) {
    return `Oricând • ${startHour} - ${endHour}`;
  }

  if (!startDate) return null;

  const formattedDate = `${dayjs(startDate).format("D")} ${dayjs(startDate).format("MMM").toLowerCase()}`;

  if (startTime && endTime) {
    return `${formattedDate} • ${startHour} - ${endHour}`;
  }

  if (startTime) {
    return `${formattedDate} • de la ${startHour}`;
  }

  return formattedDate;
};
