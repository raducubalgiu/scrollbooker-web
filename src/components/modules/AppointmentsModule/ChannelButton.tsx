import { DropdownMenu } from "@/components/cutomized/DropdownMenu/DropdownMenu";
import {
  AppointmentChannelEnum,
  getAppointmentChannelLabel,
} from "@/ts/models/booking/appointment/AppointmentChannelEnum";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Menu, MenuItem, Theme } from "@mui/material";
import React from "react";

type ChannelButtonProps = {
  channel: AppointmentChannelEnum | null;
  onSetChannel: (s: AppointmentChannelEnum | null) => void;
  theme: Theme;
};

const ChannelButton: React.FC<ChannelButtonProps> = ({
  channel,
  onSetChannel,
  theme,
}) => {
  const [anchorChannelEl, setAnchorChannelEl] =
    React.useState<null | HTMLElement>(null);
  const channelOpen = Boolean(anchorChannelEl);

  const handleChannelClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorChannelEl(event.currentTarget);
  };
  const handleChannelClose = () => setAnchorChannelEl(null);

  return (
    <div>
      <Button
        id="channel-filter-button"
        aria-controls={channelOpen ? "channel-filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={channelOpen ? "true" : undefined}
        variant="outlined"
        size="large"
        color={channel ? "primary" : "secondary"}
        disableElevation
        onClick={handleChannelClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {channel ? getAppointmentChannelLabel(channel) : "Canal"}
      </Button>
      <Menu
        id="channel-filter-menu"
        slotProps={{
          list: { "aria-labelledby": "channel-filter-button" },
        }}
        anchorEl={anchorChannelEl}
        open={channelOpen}
        onClose={handleChannelClose}
      >
        <MenuItem
          onClick={() => {
            onSetChannel(null);
            handleChannelClose();
          }}
          selected={channel === null}
          disableRipple
        >
          Toate canalele
        </MenuItem>

        {AppointmentChannelEnum.all.map((s) => (
          <MenuItem
            key={s}
            onClick={() => {
              onSetChannel(s);
              handleChannelClose();
            }}
            selected={channel === s}
            disableRipple
          >
            {getAppointmentChannelLabel(s)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ChannelButton;
