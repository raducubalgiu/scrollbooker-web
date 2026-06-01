"use client";

import { useCustomQuery } from "@/hooks/useHttp";
import dayjs from "@/lib/dayjs";
import { CalendarEventsResponse } from "@/ts/models/booking/availability/CalendarEvents";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { Session } from "next-auth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useMemo, useState } from "react";
import BlockIcon from "@mui/icons-material/Block";
import AddIcon from "@mui/icons-material/Add";
import { alpha } from "@mui/system";
import { createTimeRowMap } from "./createTimeRowMap";

interface WeeklyCalendarHeaderProps {
  currentWeekDate: dayjs.Dayjs;
  slotDuration: number;
  onSlotDurationChange: (duration: number) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
  onBlockSlots: () => void;
  onAddAppointment: () => void;
}

export const WeeklyCalendarHeader = ({
  currentWeekDate,
  slotDuration,
  onSlotDurationChange,
  onPrevWeek,
  onNextWeek,
  onToday,
  onBlockSlots,
  onAddAppointment,
}: WeeklyCalendarHeaderProps) => {
  const startOfWeek = currentWeekDate.startOf("week");
  const endOfWeek = currentWeekDate.endOf("week");

  const formattedRange = `${startOfWeek.format("DD MMM")} — ${endOfWeek.format("DD MMM YYYY")}`;

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    onSlotDurationChange(Number(event.target.value));
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent="space-between"
      spacing={2}
      sx={{
        width: "100%",
        userSelect: "none",
        p: 5,
      }}
    >
      {/* SECTIUNEA 1: Titlul și Intervalul Săptămânii */}
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, textTransform: "capitalize", lineHeight: 1.2 }}
        >
          {currentWeekDate.format("MMMM YYYY")}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 500, mt: 0.5 }}
        >
          {formattedRange}
        </Typography>
      </Box>

      {/* SECTIUNEA 2: Controalele și Butoanele de Acțiune */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        spacing={2}
        sx={{ width: { xs: "100%", md: "auto" } }}
      >
        {/* Sub-Grup 2.1: Navigare + Dropdown Durată */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {/* Navigare Dată */}
          {/* <IconButton
            onClick={onToday}
            size="small"
            title="Săptămâna curentă"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1.5,
              p: 0.75,
            }}
          >
            <CalendarTodayIcon fontSize="small" />
          </IconButton> */}

          <Stack
            direction="row"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1.5,
              overflow: "hidden",
            }}
          >
            <IconButton
              onClick={onPrevWeek}
              size="medium"
              title="Săptămâna trecută"
              sx={{ borderRadius: 0, p: 0.75 }}
            >
              <ChevronLeftIcon fontSize="medium" />
            </IconButton>
            <Box sx={{ width: "1px", bgcolor: "divider" }} />
            <IconButton
              onClick={onNextWeek}
              size="medium"
              title="Săptămâna viitoare"
              sx={{ borderRadius: 0, p: 0.75 }}
            >
              <ChevronRightIcon fontSize="medium" />
            </IconButton>
          </Stack>

          {/* Dropdown pentru selectarea duratei slotului */}
          <FormControl size="small" sx={{ minWidth: 110 }}>
            <Select
              value={slotDuration}
              onChange={handleSelectChange}
              sx={{ borderRadius: 1.5 }}
              displayEmpty
            >
              <MenuItem value={15}>15 min</MenuItem>
              <MenuItem value={30}>30 min</MenuItem>
              <MenuItem value={45}>45 min</MenuItem>
              <MenuItem value={60}>60 min</MenuItem>
              <MenuItem value={120}>2 ore</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Sub-Grup 2.2: Butoanele administrative operationale */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            startIcon={<BlockIcon />}
            onClick={onBlockSlots}
            disableElevation
            sx={{ borderRadius: 1.5, textTransform: "none", fontWeight: 600 }}
          >
            Blochează sloturi
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<AddIcon />}
            onClick={onAddAppointment}
            sx={{ borderRadius: 1.5, textTransform: "none", fontWeight: 600 }}
            disableElevation
          >
            Adaugă o programare
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
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
        sx={(theme) => ({
          gridColumn: dayColumnIndex,
          gridRowStart: startRow,
          gridRowEnd: endRow,
          backgroundColor: alpha(theme.palette.error.main, 0.1),
          color: "#c62828",
          p: 1,
          margin: "2px",
          borderRadius: 1,
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          borderLeft: "4px solid #e53935",
          boxSizing: "border-box",
        })}
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
        sx={(theme) => ({
          gridColumn: dayColumnIndex,
          gridRowStart: startRow,
          gridRowEnd: endRow,
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
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
          borderLeft: 4,
          borderColor: "primary.main",
        })}
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

type WeeklyCalendarProps = {
  session: Session;
};

export const WeeklyCalendar = ({ session }: WeeklyCalendarProps) => {
  const [slotDuration, setSlotDuration] = useState(60);
  const [currentWeekDate, setCurrentWeekDate] = useState<dayjs.Dayjs>(() =>
    dayjs()
  );

  // 2. Calculăm automat string-urile pentru API pe baza datei centrale
  const startDateStr = useMemo(
    () => currentWeekDate.startOf("week").format("YYYY-MM-DD"),
    [currentWeekDate]
  );
  const endDateStr = useMemo(
    () => currentWeekDate.endOf("week").format("YYYY-MM-DD"),
    [currentWeekDate]
  );

  const { data } = useCustomQuery<CalendarEventsResponse>({
    key: [
      "weekly-calendar",
      slotDuration,
      session?.user_id,
      startDateStr,
      endDateStr,
    ],
    url: "/api/availability/weekly-calendar",
    options: {
      enabled: !!session?.user_id,
    },
    params: {
      start_date: startDateStr,
      end_date: endDateStr,
      user_id: session?.user_id,
      slot_duration: slotDuration,
    },
  });

  const { min_slot_time, max_slot_time, days } = data || {};

  const { timeStrings, rowMap, totalRows } = useMemo(() => {
    if (!min_slot_time || !max_slot_time)
      return { timeStrings: [], rowMap: {}, totalRows: 0 };
    return createTimeRowMap(min_slot_time, max_slot_time, slotDuration);
  }, [min_slot_time, max_slot_time, slotDuration]);

  const handlePrevWeek = () =>
    setCurrentWeekDate((prev) => prev.subtract(1, "week"));
  const handleNextWeek = () =>
    setCurrentWeekDate((prev) => prev.add(1, "week"));
  const handleToday = () => setCurrentWeekDate(dayjs());

  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <WeeklyCalendarHeader
        currentWeekDate={currentWeekDate}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
        slotDuration={slotDuration}
        onSlotDurationChange={(duration) => setSlotDuration(duration)}
        onBlockSlots={() => {}}
        onAddAppointment={() => {}}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `90px repeat(7, minmax(130px, 1fr))`,
          gridTemplateRows: `70px repeat(${totalRows - 1}, 100px)`,
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
            backgroundColor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
        {days?.map((dayData, index) => {
          const dateObj = dayjs(dayData.day);

          return (
            <Box
              key={dayData.day}
              sx={{
                gridColumn: index + 2,
                gridRow: 1,
                p: 1,
                textAlign: "center",
                backgroundColor: "background.paper",
                borderTop: "1px solid",
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
                backgroundColor: "background.paper",
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
        {days?.map((dayData, dayIndex) => {
          const colIndex = dayIndex + 2;

          return timeStrings.map((time) => {
            const currentRow = rowMap[time];

            // Verificăm dacă ora curentă se află în interiorul programului trimis de BE
            const hasSlotInBackend = dayData.slots.some((slot) => {
              const start = dayjs(slot.start_date_locale);
              const end = dayjs(slot.end_date_locale);
              const currentCell = dayjs(`${dayData.day}T${time}`);
              return currentCell.isBetween(start, end, null, "[)");
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
                    ? "background.default"
                    : "transparent",
                }}
              >
                {isOutsideSchedule ? (
                  <Box
                    sx={(theme) => {
                      const strokeColor = theme.palette.text.secondary;

                      return {
                        width: "100%",
                        height: "100%",
                        // Hașură fină cu linii subțiri (distanță redusă la 6px pentru discreție)
                        backgroundImage: `repeating-linear-gradient(
                          45deg, 
                          transparent, 
                          transparent 5px, 
                          ${strokeColor} 5px, 
                          ${strokeColor} 6px
                        )`,
                        // Topire naturală în fundal în funcție de modul activ
                        mixBlendMode:
                          theme.palette.mode === "light"
                            ? "multiply"
                            : "screen",
                        opacity: 0.15, // Opacitate redusă pentru un efect foarte soft
                      };
                    }}
                  />
                ) : (
                  <ButtonBase
                    onClick={() => {}}
                    sx={{
                      width: "100%",
                      height: "100%",
                      transition: "background-color 0.15s ease",
                      "&:hover": {
                        backgroundColor: "action.hover",
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
