import dayjs from "@/lib/dayjs";

type DateTimeLabelState = {
  startDate: string | null;
  startTime: string | null;
  endTime: string | null;
};

export const getDateTimeLabel = (state: DateTimeLabelState): string | null => {
  const { startDate, startTime, endTime } = state;

  if (!startDate && startTime && endTime) {
    return `Oricând • ${startTime} - ${endTime}`;
  }

  if (!startDate) return null;

  const formattedDate = `${dayjs(startDate).format("D")} ${dayjs(startDate).format("MMM").toLowerCase()}`;

  if (startTime && endTime) {
    return `${formattedDate} • ${startTime} - ${endTime}`;
  }

  if (startTime) {
    return `${formattedDate} • de la ${startTime}`;
  }

  return formattedDate;
};
