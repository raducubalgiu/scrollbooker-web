import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import { Dayjs } from "dayjs";
import dayjs from "@/lib/dayjs";
import CustomCalendar from "@/components/cutomized/CustomCalendar/CustomCalendar";

type TimePresetType = "morning" | "noon" | "evening" | "custom" | null;

const SearchDateTimeSection = () => {
  const today = useMemo(() => dayjs().startOf("day"), []);
  const tomorrow = useMemo(() => today.add(1, "day"), [today]);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [activePreset, setActivePreset] = useState<TimePresetType>(null);
  const [customStartTime, setCustomStartTime] = useState<string>("09:00");
  const [customEndTime, setCustomEndTime] = useState<string>("18:00");

  const isTodaySelected = selectedDate
    ? selectedDate.isSame(today, "day")
    : false;
  const isTomorrowSelected = selectedDate
    ? selectedDate.isSame(tomorrow, "day")
    : false;

  const handleShortcutClick = useCallback(
    (type: "today" | "tomorrow") => {
      setSelectedDate(type === "today" ? today : tomorrow);
    },
    [today, tomorrow]
  );

  const handlePresetSelect = useCallback((preset: TimePresetType) => {
    setActivePreset(preset);
  }, []);

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={700} mb={3}>
        Când?
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="flex-start"
      >
        <Box sx={styles.leftColumn}>
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              onClick={() => handleShortcutClick("today")}
              sx={styles.shortcutButton(isTodaySelected)}
            >
              Astăzi
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleShortcutClick("tomorrow")}
              sx={styles.shortcutButton(isTomorrowSelected)}
            >
              Mâine
            </Button>
          </Stack>

          <Stack spacing={1.25} width="100%">
            <Button
              onClick={() => handlePresetSelect("morning")}
              sx={styles.boxButton(activePreset === "morning")}
            >
              <Typography sx={styles.titleText}>Dimineața</Typography>
              <Typography sx={styles.timeText}>08:00 - 12:00</Typography>
            </Button>

            <Button
              onClick={() => handlePresetSelect("noon")}
              sx={styles.boxButton(activePreset === "noon")}
            >
              <Typography sx={styles.titleText}>La prânz</Typography>
              <Typography sx={styles.timeText}>12:00 - 16:00</Typography>
            </Button>

            <Button
              onClick={() => handlePresetSelect("evening")}
              sx={styles.boxButton(activePreset === "evening")}
            >
              <Typography sx={styles.titleText}>Seara</Typography>
              <Typography sx={styles.timeText}>16:00 - 21:00</Typography>
            </Button>

            <Button
              onClick={() => handlePresetSelect("custom")}
              sx={styles.boxButton(activePreset === "custom")}
            >
              <Typography sx={{ ...styles.titleText, py: 1.5 }}>
                Personalizat
              </Typography>
            </Button>
          </Stack>

          {/* 3. Input-uri dinamice pentru opțiunea Custom */}
          {activePreset === "custom" && (
            <Box sx={styles.customTimeContainer}>
              <TextField
                label="De la"
                type="time"
                value={customStartTime}
                onChange={(e) => setCustomStartTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 300 }}
                fullWidth
                size="small"
              />
              <TextField
                label="Până la"
                type="time"
                value={customEndTime}
                onChange={(e) => setCustomEndTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 300 }}
                fullWidth
                size="small"
              />
            </Box>
          )}
        </Box>

        <Box sx={{ px: 1 }}>
          <CustomCalendar value={selectedDate} onChange={setSelectedDate} />
        </Box>
      </Stack>
    </Box>
  );
};

export default SearchDateTimeSection;

const styles = {
  leftColumn: {
    minWidth: 280,
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
    gap: 2.5,
  },
  boxButton: (isActive: boolean) => ({
    width: "100%",
    py: 1.5,
    px: 2.5,
    borderRadius: 3,
    textTransform: "none" as const,
    textAlign: "left" as const,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column" as const,
    border: isActive ? "2px solid" : "1.5px solid",
    borderColor: isActive ? "primary.main" : "divider",
    bgcolor: "transparent",
    color: "text.primary",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "primary.main",
      bgcolor: isActive ? "rgba(25, 118, 210, 0.08)" : "action.hover",
    },
  }),
  shortcutButton: (isActive: boolean) => ({
    flex: 1,
    py: 1.5,
    borderRadius: 3,
    textTransform: "none" as const,
    fontWeight: 600,
    fontSize: "0.95rem",
    border: isActive ? "2px solid" : "1.5px solid",
    borderColor: isActive ? "primary.main" : "divider",
    bgcolor: "transparent",
    color: "text.primary",
    "&:hover": {
      borderColor: "primary.main",
      bgcolor: isActive ? "rgba(25, 118, 210, 0.08)" : "action.hover",
    },
  }),
  titleText: {
    fontWeight: 600,
    color: "text.primary",
    lineHeight: 1.3,
  },
  timeText: {
    fontSize: "0.9rem",
    color: "text.secondary",
    mt: 0.25,
  },
  customTimeContainer: {
    display: "flex",
    gap: 1.5,
    mt: 0.5,
    animation: "fadeIn 0.2s ease-out",
    "@keyframes fadeIn": {
      from: { opacity: 0, transform: "translateY(-5px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
  },
};
