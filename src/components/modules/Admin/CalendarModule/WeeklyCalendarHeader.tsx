import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { Dayjs } from "dayjs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BlockIcon from "@mui/icons-material/Block";
import AddIcon from "@mui/icons-material/Add";

interface WeeklyCalendarHeaderProps {
  currentWeekDate: Dayjs;
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
