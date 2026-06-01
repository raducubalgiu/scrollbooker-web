"use client";

import { useCustomQuery } from "@/hooks/useHttp";
import dayjs from "@/lib/dayjs";
import { CalendarEventsResponse } from "@/ts/models/booking/availability/CalendarEvents";
import {
  Avatar,
  Box,
  ButtonBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

const createTimeRowMap = (
  minTimeIso: string,
  maxTimeIso: string,
  slotDuration: number
) => {
  const startStr = minTimeIso.includes("T")
    ? minTimeIso.split("T")[1]
    : "09:00:00";
  const endStr = maxTimeIso.includes("T")
    ? maxTimeIso.split("T")[1]
    : "23:30:00";

  let current = dayjs(`2026-01-01T${startStr}`);
  const end = dayjs(`2026-01-01T${endStr}`);

  const timeStrings: string[] = [];
  const rowMap: Record<string, number> = {};

  let rowIndex = 2;

  while (current.isBefore(end) || current.isSame(end)) {
    const timeFormatted = current.format("HH:mm:ss");
    timeStrings.push(timeFormatted);
    rowMap[timeFormatted] = rowIndex;

    current = current.add(slotDuration, "minute");
    rowIndex++;
  }

  return { timeStrings, rowMap, totalRows: rowIndex - 1 };
};

interface CalendarEventProps {
  slot: any;
  dayColumnIndex: number;
  rowMap: Record<string, number>;
}

const CalendarEvent = ({
  slot,
  dayColumnIndex,
  rowMap,
}: CalendarEventProps) => {
  const startTime = dayjs(slot.start_date_locale).format("HH:mm:ss");
  const endTime = dayjs(slot.end_date_locale).format("HH:mm:ss");

  // Aflăm exact de la ce rând începe și unde se termină evenimentul în Grid
  const startRow = rowMap[startTime];
  const endRow = rowMap[endTime];

  // Dacă orele nu se potrivesc pe axa noastră din FE, nu randăm pentru a evita crash-ul
  if (!startRow || !endRow) return null;

  if (slot.is_blocked) {
    return (
      <Box
        sx={{
          gridColumn: dayColumnIndex,
          gridRowStart: startRow,
          gridRowEnd: endRow,
          backgroundColor: "#ffebee",
          color: "#c62828",
          p: 1,
          margin: "2px",
          borderRadius: 1,
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          borderLeft: "4px solid #e53935",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {slot.info?.message || "Blocat administrativ"}
        </Typography>
      </Box>
    );
  }

  if (slot.is_booked) {
    return (
      <Paper
        elevation={2}
        sx={{
          gridColumn: dayColumnIndex,
          gridRowStart: startRow,
          gridRowEnd: endRow,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          p: 1,
          margin: "2px",
          borderRadius: 1,
          zIndex: 4,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            src={slot.info?.customer?.avatar || undefined}
            alt={slot.info?.customer?.fullname}
            sx={{
              width: 24,
              height: 24,
              border: "1px solid #fff",
              bgcolor: "primary.dark",
              fontSize: "10px",
            }}
          >
            {slot.info?.customer?.fullname?.substring(0, 2).toUpperCase()}
          </Avatar>
          <Box sx={{ overflow: "hidden" }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                display: "block",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {slot.info?.customer?.fullname}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: "10px", opacity: 0.9, display: "block" }}
            >
              {slot.info?.total_price_with_discount}{" "}
              {slot.info?.payment_currency?.name}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    );
  }

  return null;
};

export const WeeklyCalendar = () => {
  const slotDuration = 60;
  const start_date = dayjs()
    .startOf("week")
    .add(1, "week")
    .format("YYYY-MM-DD");
  const end_date = dayjs().endOf("week").add(1, "week").format("YYYY-MM-DD");

  const { data } = useCustomQuery<CalendarEventsResponse>({
    key: ["weekly-calendar", slotDuration],
    url: "/api/availability/weekly-calendar",
    params: {
      start_date,
      end_date,
      user_id: 13,
      slot_duration: slotDuration,
    },
  });

  const { min_slot_time, max_slot_time, days, business_short_domain } =
    data || {};

  // Calculăm structura rândurilor și harta de coordonate
  const { timeStrings, rowMap, totalRows } = useMemo(() => {
    if (!min_slot_time || !max_slot_time)
      return { timeStrings: [], rowMap: {}, totalRows: 0 };
    return createTimeRowMap(min_slot_time, max_slot_time, slotDuration);
  }, [min_slot_time, max_slot_time, slotDuration]);

  return (
    <Box sx={{ width: "100%", boxSizing: "border-box" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Gestiune Calendar: {business_short_domain}
      </Typography>

      <Box
        sx={{
          display: "grid",
          // 8 Coloane fixe: 1 pentru axa orară (90px) + 7 pentru zile
          gridTemplateColumns: `90px repeat(7, minmax(130px, 1fr))`,
          // Definim numărul exact de rânduri dinamice. Fiecare are o înălțime fixă de 60px
          gridTemplateRows: `50px repeat(${totalRows - 1}, 60px)`,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "background.paper",
        }}
      >
        {/* ==========================================
            1. HEADER: ZILELE SĂPTĂMÂNII (Row 1)
            ========================================== */}
        <Box
          sx={{
            gridColumn: 1,
            gridRow: 1,
            backgroundColor: "grey.50",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
        {days?.map((dayData: any, index: number) => {
          const dateObj = dayjs(dayData.day);
          return (
            <Box
              key={dayData.day}
              sx={{
                gridColumn: index + 2, // Coloanele încep de la 2 (Luni=2, Marți=3...)
                gridRow: 1,
                p: 1,
                textAlign: "center",
                backgroundColor: "grey.50",
                borderBottom: "1px solid",
                borderLeft: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", textTransform: "capitalize" }}
              >
                {dateObj.format("dddd")}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {dateObj.format("DD MMM")}
              </Typography>
            </Box>
          );
        })}

        {/* ==========================================
            2. AXA ORARĂ DIN STÂNGA (Coloana 1)
            ========================================== */}
        {timeStrings.map((time) => {
          const currentRow = rowMap[time];
          return (
            <Box
              key={`axis-${time}`}
              sx={{
                gridColumn: 1,
                gridRow: currentRow,
                p: 1,
                textAlign: "right",
                pr: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
                backgroundColor: "grey.50",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                {time.substring(0, 5)}
              </Typography>
            </Box>
          );
        })}

        {/* ==========================================
            3. STRATUL DE FUNDAL: CELULE ȘI BUTOANE
            ========================================== */}
        {days?.map((dayData: any, dayIndex: number) => {
          const colIndex = dayIndex + 2;

          return timeStrings.map((time) => {
            const currentRow = rowMap[time];

            // Verificăm dacă ora curentă se află în interiorul programului trimis de BE
            const hasSlotInBackend = dayData.slots.some((slot: any) => {
              const start = dayjs(slot.start_date_locale);
              const end = dayjs(slot.end_date_locale);
              const currentCell = dayjs(`${dayData.day}T${time}`);
              return (
                currentCell.isSame(start) ||
                currentCell.isBetween(start, end, null, "[)")
              );
            });

            const isOutsideSchedule = !hasSlotInBackend || dayData.is_closed;

            return (
              <Box
                key={`bg-${dayData.day}-${time}`}
                sx={{
                  gridColumn: colIndex,
                  gridRow: currentRow,
                  borderBottom: "1px solid",
                  borderLeft: "1px solid",
                  borderColor: "divider",
                  position: "relative",
                  boxSizing: "border-box",
                  backgroundColor: isOutsideSchedule
                    ? "rgba(0, 0, 0, 0.03)"
                    : "transparent",
                }}
              >
                {isOutsideSchedule ? (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.015) 5px, rgba(0,0,0,0.015) 10px)",
                    }}
                  />
                ) : (
                  <ButtonBase
                    onClick={() =>
                      console.log(
                        `Click slot liber: ${dayData.day} la ora ${time}`
                      )
                    }
                    sx={{
                      width: "100%",
                      height: "100%",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.05)",
                      },
                    }}
                  />
                )}
              </Box>
            );
          });
        })}

        {/* ==========================================
            4. STRATUL DE SUPRAPUNERE: EVENIMENTELE DIN BE
            ========================================== */}
        {days?.map((dayData: any, dayIndex: number) => {
          const colIndex = dayIndex + 2;
          return dayData.slots.map((slot: any, slotIndex: number) => (
            <CalendarEvent
              key={`event-${dayData.day}-${slotIndex}`}
              slot={slot}
              dayColumnIndex={colIndex}
              rowMap={rowMap}
            />
          ));
        })}
      </Box>
    </Box>
  );
};
