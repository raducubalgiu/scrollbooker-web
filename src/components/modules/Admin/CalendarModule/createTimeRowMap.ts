import dayjs from "@/lib/dayjs";

export const createTimeRowMap = (
  minTimeIso: string,
  maxTimeIso: string,
  slotDuration: number
) => {
  const startStr = minTimeIso.split("T")[1];
  const endStr = maxTimeIso.split("T")[1];

  let current = dayjs(`2026-01-01T${startStr}`);
  const end = dayjs(`2026-01-01T${endStr}`);

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
