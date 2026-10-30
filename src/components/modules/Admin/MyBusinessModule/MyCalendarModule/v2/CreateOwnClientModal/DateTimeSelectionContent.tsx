"use client";

import React from "react";
import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import dayjs from "@/lib/dayjs";
import { AvailableTimeSlot } from "@/ts/models/booking/availability/AvailableTimeSlot";
import MobileDayPager from "../Mobile/MobileDayPager";
import { SelectedSlot } from "./createOwnClientTypes";
import { useOwnClientTimeslots } from "./useOwnClientTimeslots";

export type DateTimeSelectionContentProps = {
  businessId: number;
  employeeId: number | undefined;
  totalDurationMinutes: number;
  selectedSlot: SelectedSlot | null;
  initialDay: string | null;
  onSelectSlot: (slot: SelectedSlot) => void;
};

const SKELETON_COUNT = 6;

const toSelectedSlot = (slot: AvailableTimeSlot): SelectedSlot => ({
  startUtc: slot.start_date_utc,
  endUtc: slot.end_date_utc,
  startLocale: slot.start_date_locale,
  endLocale: slot.end_date_locale,
});

const DateTimeSelectionContent = ({
  businessId,
  employeeId,
  totalDurationMinutes,
  selectedSlot,
  initialDay,
  onSelectSlot,
}: DateTimeSelectionContentProps) => {
  const t = useOwnClientTimeslots({
    businessId,
    employeeId,
    totalDurationMinutes,
    initialDay: selectedSlot?.startLocale ?? initialDay,
  });

  const renderSlots = () => {
    if (t.isLoadingDays || t.isLoadingSlots) {
      return (
        <Box sx={styles.slotsGrid}>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={56}
              sx={{ borderRadius: 3 }}
            />
          ))}
        </Box>
      );
    }

    if (t.isError) {
      return (
        <Stack sx={styles.empty} spacing={1.5}>
          <Typography color="text.secondary">
            Intervalele orare nu au putut fi încărcate.
          </Typography>
          <Button variant="outlined" onClick={() => t.refetchSlots()}>
            Reîncearcă
          </Button>
        </Stack>
      );
    }

    if (t.slots.length === 0) {
      return (
        <Stack sx={styles.empty} spacing={1}>
          <Box sx={styles.emptyIcon}>
            <EventBusyOutlinedIcon sx={{ fontSize: 28 }} />
          </Box>
          <Typography fontWeight={700} sx={{ pt: 1 }}>
            Niciun interval disponibil
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Nu mai există intervale libere de {totalDurationMinutes} min în
            această zi.
          </Typography>
          {t.nextAvailableDay && (
            <Button
              variant="outlined"
              sx={{ mt: 1.5 }}
              onClick={() =>
                t.nextAvailableDay && t.handleSelectDay(t.nextAvailableDay)
              }
            >
              Următoarea zi disponibilă
            </Button>
          )}
        </Stack>
      );
    }

    return (
      <Box sx={styles.slotsGrid}>
        {t.slots.map((slot) => {
          const isSelected = selectedSlot?.startUtc === slot.start_date_utc;

          return (
            <ButtonBase
              key={slot.start_date_utc}
              onClick={() => onSelectSlot(toSelectedSlot(slot))}
              sx={isSelected ? styles.slotSelected : styles.slot}
            >
              <Typography fontWeight={700}>
                {dayjs(slot.start_date_locale).format("HH:mm")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                – {dayjs(slot.end_date_locale).format("HH:mm")}
              </Typography>
              <ChevronRightIcon sx={styles.slotChevron} />
            </ButtonBase>
          );
        })}
      </Box>
    );
  };

  return (
    <Box sx={styles.root}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, pt: 1 }}
      >
        <Typography fontWeight={700} sx={{ textTransform: "capitalize" }}>
          {t.periodLabel}
        </Typography>
        <Stack direction="row" spacing={0.5}>
          <IconButton
            size="small"
            disabled={!t.canGoPrevious}
            onClick={t.handlePreviousWeek}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            size="small"
            disabled={!t.canGoNext}
            onClick={t.handleNextWeek}
          >
            <ChevronRightIcon />
          </IconButton>
        </Stack>
      </Stack>

      <MobileDayPager
        weekStart={t.weekStart}
        selectedDay={t.selectedDay}
        availableDaysSet={t.availableDaysSet}
        onSelectDay={t.handleSelectDay}
      />

      <Typography variant="body2" color="text.secondary" sx={{ px: 2, pb: 1 }}>
        {t.selectedDay.format("dddd, D MMMM")} · durata {totalDurationMinutes}{" "}
        min
      </Typography>

      <Box sx={styles.slotsContainer}>{renderSlots()}</Box>
    </Box>
  );
};

export default DateTimeSelectionContent;

const slotBase = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 1,
  height: 56,
  px: 2,
  borderRadius: 3,
  border: "1px solid",
  bgcolor: "background.paper",
} as const;

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
  },
  slotsContainer: {
    flex: 1,
    minHeight: { xs: 320, md: 380 },
    overflowY: "auto",
    px: 2,
    pb: 2,
  },
  slotsGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
    gap: 1.25,
  },
  slot: {
    ...slotBase,
    borderColor: "divider",
    "&:hover": { borderColor: "text.secondary" },
  },
  slotSelected: {
    ...slotBase,
    borderColor: "primary.main",
    borderWidth: 2,
  },
  slotChevron: {
    ml: "auto",
    fontSize: 18,
    color: "text.disabled",
  },
  empty: {
    alignItems: "center",
    textAlign: "center",
    pt: 5,
    px: 3,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "action.hover",
    color: "text.primary",
  },
} as const;
