import React from "react";
import { Avatar, SxProps, Theme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { toCalendarColor } from "@/ts/enums/CalendarColorEnum";
import { getInitials } from "@/utils/formatters";

type CalendarAvatarProps = {
  src: string | null | undefined;
  name: string | null | undefined;
  calendarColor: string | null | undefined;
  sx?: SxProps<Theme>;
};

const CalendarAvatar = ({ src, name, calendarColor, sx }: CalendarAvatarProps) => {
  const color = src ? null : toCalendarColor(calendarColor);
  const initials = getInitials(name);

  return (
    <Avatar
      {...(src ? { src } : {})}
      sx={[
        styles.avatar,
        ...(Array.isArray(sx) ? sx : [sx]),
        !!color && {
          bgcolor: (theme: Theme) => theme.palette.calendar[color],
          color: "common.white",
        },
      ]}
    >
      {initials || <PersonIcon fontSize="small" />}
    </Avatar>
  );
};

export default CalendarAvatar;

const styles = {
  avatar: {
    fontWeight: 700,
  },
};
