import { DropdownMenu } from "@/components/cutomized/DropdownMenu/DropdownMenu";
import {
  AppointmentStatusEnum,
  getAppointmentStatusLabel,
} from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, MenuItem, Theme } from "@mui/material";
import React from "react";

type StatusButtonProps = {
  status: AppointmentStatusEnum | null;
  onSetStatus: (s: AppointmentStatusEnum | null) => void;
  theme: Theme;
};

const StatusButton: React.FC<StatusButtonProps> = ({
  status,
  onSetStatus,
  theme,
}) => {
  const [anchorStatusEl, setAnchorStatusEl] =
    React.useState<null | HTMLElement>(null);

  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorStatusEl(event.currentTarget);
  };
  const handleStatusClose = () => setAnchorStatusEl(null);

  const isOpen = Boolean(anchorStatusEl);

  return (
    <div>
      <Button
        id="status-filter-button"
        aria-controls={isOpen ? "status-filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        variant="outlined"
        size="large"
        color={status ? "primary" : "secondary"}
        disableElevation
        onClick={handleStatusClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {status ? getAppointmentStatusLabel(status) : "Status"}
      </Button>
      <DropdownMenu
        id="status-filter-menu"
        slotProps={{
          list: { "aria-labelledby": "status-filter-button" },
        }}
        anchorEl={anchorStatusEl}
        open={isOpen}
        onClose={handleStatusClose}
      >
        <MenuItem
          onClick={() => {
            onSetStatus(null);
            handleStatusClose();
          }}
          selected={status === null}
          disableRipple
        >
          Toate statusurile
        </MenuItem>

        {AppointmentStatusEnum.all.map((s) => (
          <MenuItem
            key={s}
            onClick={() => {
              onSetStatus(s);
              handleStatusClose();
            }}
            selected={status === s}
            disableRipple
          >
            {getAppointmentStatusLabel(s)}
          </MenuItem>
        ))}
      </DropdownMenu>
    </div>
  );
};

export default StatusButton;
