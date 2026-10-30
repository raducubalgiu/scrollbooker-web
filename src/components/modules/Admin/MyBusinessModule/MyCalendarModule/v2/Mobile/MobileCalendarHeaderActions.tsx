"use client";

import React from "react";
import { Box, ButtonBase, IconButton, Typography, alpha } from "@mui/material";
import CalendarAvatar from "../CalendarAvatar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";

type MobileCalendarHeaderActionsProps = {
  showsEmployeeDropdown: boolean;
  ownAvatar: string | null;
  ownCalendarColor: string | null;
  ownFullname: string | null;
  selectedEmployeeColor: string | null;
  ownUsername: string;
  selectedEmployee: BusinessEmployee | undefined;
  isBlocking: boolean;
  hasFreeSlots: boolean;
  enableBack: boolean;
  enableNext: boolean;
  onOpenEmployeeSheet: () => void;
  onToggleBlocking: () => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  isTodaySelected?: boolean;
  onToday?: () => void;
};

const MobileCalendarHeaderActions = ({
  showsEmployeeDropdown,
  ownAvatar,
  ownCalendarColor,
  ownFullname,
  selectedEmployeeColor,
  ownUsername,
  selectedEmployee,
  isBlocking,
  hasFreeSlots,
  enableBack,
  enableNext,
  onOpenEmployeeSheet,
  onToggleBlocking,
  onPreviousWeek,
  onNextWeek,
  isTodaySelected = false,
  onToday,
}: MobileCalendarHeaderActionsProps) => {
  return (
    <Box sx={styles.row}>
      {showsEmployeeDropdown ? (
        <Box sx={styles.chip} onClick={onOpenEmployeeSheet}>
          <CalendarAvatar
            src={selectedEmployee?.avatar}
            name={selectedEmployee?.fullname}
            calendarColor={selectedEmployeeColor}
            sx={styles.avatar}
          />
          <Typography variant="body2" noWrap sx={{ minWidth: 0 }}>
            {selectedEmployee?.fullname ?? "Selectează angajat"}
          </Typography>
          <ExpandMoreIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Box>
      ) : (
        <Box sx={styles.chip}>
          <CalendarAvatar
            src={ownAvatar}
            name={ownFullname}
            calendarColor={ownCalendarColor}
            sx={styles.avatar}
          />
          <Typography variant="body2" noWrap sx={{ minWidth: 0 }}>
            {ownUsername}
          </Typography>
        </Box>
      )}

      <Box sx={{ flex: 1 }} />

      <IconButton
        onClick={onToggleBlocking}
        disabled={!hasFreeSlots}
        sx={{
          ...styles.blockButton,
          bgcolor: (theme) =>
            isBlocking ? alpha(theme.palette.error.main, 0.15) : theme.palette.action.hover,
          color: isBlocking ? "error.main" : "text.primary",
        }}
      >
        <LockIcon sx={{ fontSize: 16 }} />
      </IconButton>

      {onToday && (
        <ButtonBase
          onClick={onToday}
          disabled={isTodaySelected}
          sx={{ ...styles.todayButton, opacity: isTodaySelected ? 0.4 : 1 }}
        >
          <Typography variant="body2" fontWeight={600}>
            Azi
          </Typography>
        </ButtonBase>
      )}

      <IconButton
        onClick={onPreviousWeek}
        disabled={!enableBack}
        size="small"
        sx={styles.weekArrow}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={onNextWeek}
        disabled={!enableNext}
        size="small"
        sx={styles.weekArrow}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default MobileCalendarHeaderActions;

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    px: 2,
    pt: 1,
  },
  chip: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    minWidth: 0,
    maxWidth: "55%",
    px: 1.5,
    py: 0.5,
    borderRadius: 10,
    border: "1px solid",
    borderColor: "divider",
    cursor: "pointer",
  },
  avatar: {
    width: 24,
    height: 24,
  },
  blockButton: {
    width: 40,
    height: 40,
  },
  todayButton: {
    height: 36,
    px: 1.75,
    borderRadius: 10,
    border: "1px solid",
    borderColor: "divider",
    color: "text.primary",
  },
  weekArrow: {
    width: 36,
    height: 36,
    border: "1px solid",
    borderColor: "divider",
  },
} as const;
