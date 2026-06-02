import dayjs from "@/lib/dayjs";

export const createTimeRowMap = (
  minTimeStr: string,
  maxTimeStr: string,
  slotDuration: number
) => {
  let current = dayjs(`2026-01-01T${minTimeStr}`);
  const end = dayjs(`2026-01-01T${maxTimeStr}`);

  const timeStrings: string[] = [];
  const rowMap: Record<string, number> = {};

  let rowIndex = 2;

  while (current.isBefore(end)) {
    const timeFormatted = current.format("HH:mm:ss");
    timeStrings.push(timeFormatted);
    rowMap[timeFormatted] = rowIndex;

    current = current.add(slotDuration, "minute");
    rowIndex++;
  }

  const finalTimeFormatted = end.format("HH:mm:ss");
  rowMap[finalTimeFormatted] = rowIndex;

  return { timeStrings, rowMap, totalRows: rowIndex - 1 };
};
