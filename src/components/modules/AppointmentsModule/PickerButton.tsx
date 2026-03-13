import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, Popover } from "@mui/material";
import { Dayjs } from "dayjs";
import { DateRangeIcon } from "@mui/x-date-pickers";

type PickerButtonProps = {
  date: Dayjs | null;
  onSetDate: (d: Dayjs | null) => void;
};

const PickerButton: React.FC<PickerButtonProps> = ({ date, onSetDate }) => {
  const [dateAnchorEl, setDateAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button
        id="date-filter-button"
        aria-controls={dateAnchorEl ? "date-popover" : undefined}
        aria-haspopup="true"
        aria-expanded={dateAnchorEl ? "true" : undefined}
        variant={date ? "outlined" : "outlined"}
        color={date ? "primary" : "secondary"}
        size="large"
        disableElevation
        onMouseDown={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          if (dateAnchorEl) {
            setDateAnchorEl(null);
          } else {
            setDateAnchorEl(e.currentTarget);
          }
        }}
        startIcon={<DateRangeIcon />}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {date ? date.format("DD.MM.YYYY") : "Custom"}
      </Button>
      <Popover
        id="date-popover"
        open={Boolean(dateAnchorEl)}
        anchorEl={dateAnchorEl}
        onClose={() => setDateAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={{ p: 1 }}>
          <DateCalendar
            value={date}
            disableFuture
            onChange={(newDate: Dayjs | null) => {
              onSetDate(newDate);
              setDateAnchorEl(null);
            }}
          />
        </Box>
      </Popover>
    </LocalizationProvider>
  );
};

export default PickerButton;
