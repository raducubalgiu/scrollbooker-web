import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Stack,
  Button,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
  alpha,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BlockIcon from "@mui/icons-material/Block";
import AddIcon from "@mui/icons-material/Add";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import dayjs from "dayjs";
import RowHeightControl from "../CalendarSettings/RowHeightControl";
import CalendarSettingsModal from "../CalendarSettings/CalendarSettingsModal";
import ExpandCalendarButton from "../CalendarSettings/ExpandCalendarButton";
import { RowHeightLevel } from "../CalendarSettings/rowHeightLevels";

interface EmployeesDayCalendarHeaderProps {
  currentDay: dayjs.Dayjs;
  isLoading: boolean;
  isBlocking: boolean;
  slotDuration: number;
  onSlotDurationChange: (duration: number) => void;
  rowHeightLevel: RowHeightLevel;
  onRowHeightChange: (level: RowHeightLevel) => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  userId: number | undefined;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  onBlockSlots: () => void;
  onAddAppointment: () => void;
}

export const EmployeesDayCalendarHeader = ({
  currentDay,
  isLoading,
  isBlocking,
  slotDuration,
  onSlotDurationChange,
  rowHeightLevel,
  onRowHeightChange,
  isExpanded,
  onToggleExpanded,
  userId,
  onPrevDay,
  onNextDay,
  onToday,
  onBlockSlots,
  onAddAppointment,
}: EmployeesDayCalendarHeaderProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const formattedDay = currentDay.format("dddd, DD MMMM YYYY");

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    onSlotDurationChange(Number(event.target.value));
  };

  const isDisabled = isBlocking || isLoading;

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      alignItems={{ xs: "flex-start", lg: "center" }}
      justifyContent="space-between"
      spacing={1.5}
      sx={{
        width: "100%",
        userSelect: "none",
        py: 2.5,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <FormControl size="medium" sx={{ minWidth: 125 }}>
          <Select
            value={slotDuration}
            onChange={handleSelectChange}
            disabled={isDisabled}
            sx={{
              borderRadius: 10,
              height: 50,
              fontSize: "15px",
              fontWeight: 700,
              borderWidth: "1px",
              backgroundColor: "background.default",
              border: 1,
              borderColor: "divider",
              "& .MuiSelect-select": { display: "flex", alignItems: "center" },
            }}
          >
            <MenuItem value={15} sx={{ fontSize: "15px", fontWeight: 600 }}>
              15 min
            </MenuItem>
            <MenuItem value={30} sx={{ fontSize: "15px", fontWeight: 600 }}>
              30 min
            </MenuItem>
            <MenuItem value={45} sx={{ fontSize: "15px", fontWeight: 600 }}>
              45 min
            </MenuItem>
            <MenuItem value={60} sx={{ fontSize: "15px", fontWeight: 600 }}>
              60 min
            </MenuItem>
          </Select>
        </FormControl>

        <RowHeightControl
          value={rowHeightLevel}
          onChange={onRowHeightChange}
          disabled={isDisabled}
        />

        <IconButton
          onClick={() => setIsSettingsOpen(true)}
          disabled={isDisabled}
          size="large"
          sx={{
            color: "text.primary",
            backgroundColor: "background.default",
            border: 1,
            borderColor: "divider",
          }}
        >
          <SettingsOutlinedIcon sx={{ fontSize: 22 }} />
        </IconButton>

        <ExpandCalendarButton
          isExpanded={isExpanded}
          onToggle={onToggleExpanded}
          disabled={isDisabled}
        />

        <CalendarSettingsModal
          open={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          userId={userId}
          canSetAppointmentGap={false}
        />

        <Button
          variant="contained"
          color="inherit"
          size="large"
          onClick={onToday}
          disabled={isDisabled}
          sx={{
            backgroundColor: "background.default",
            border: 1,
            borderColor: "divider",
            color: "text.primary",
            "&:hover": {
              backgroundColor: (theme) =>
                alpha(theme.palette.action.hover, 0.04),
            },
          }}
          disableElevation
        >
          Astazi
        </Button>

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            height: 48,
            boxSizing: "border-box",
          }}
          gap={1}
        >
          <IconButton
            onClick={onPrevDay}
            disabled={isDisabled}
            size="large"
            sx={{
              color: "text.primary",
              backgroundColor: "background.default",
              border: 1,
              borderColor: "divider",
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 25 }} />
          </IconButton>

          <IconButton
            onClick={onNextDay}
            disabled={isDisabled}
            size="large"
            sx={{
              color: "text.primary",
              backgroundColor: "background.default",
              border: 1,
              borderColor: "divider",
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 25 }} />
          </IconButton>

          <Typography sx={{ fontWeight: 500, fontSize: 25, ml: 1 }}>
            {formattedDay}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        spacing={2}
        sx={{ width: { xs: "100%", lg: "auto" }, mt: { xs: 2, lg: 0 } }}
      >
        <Button
          variant="contained"
          color="inherit"
          size="large"
          startIcon={<BlockIcon sx={{ fontSize: 20 }} />}
          onClick={onBlockSlots}
          disableElevation
          disabled={isLoading}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: "15px",
            px: 3,
            height: 48,
            width: { xs: "100%", sm: "auto" },
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? "#f8fafc" : "action.selected",
            color: "error.main",
            "&:hover": {
              backgroundColor: (theme) => alpha(theme.palette.error.main, 0.04),
            },
          }}
        >
          {isBlocking ? "Renunță" : "Blochează sloturi"}
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon sx={{ fontSize: 22 }} />}
          onClick={onAddAppointment}
          disableElevation
          disabled={isDisabled}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: "15px",
            px: 3.5,
            height: 48,
            width: { xs: "100%", sm: "auto" },
            boxShadow: "none",
          }}
        >
          Adaugă o programare
        </Button>
      </Stack>
    </Stack>
  );
};
