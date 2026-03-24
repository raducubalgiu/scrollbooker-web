import React, { useMemo } from "react";
import { Badge, Avatar, useTheme } from "@mui/material";

type UserAvatarProps = {
  isBusinessOrEmployee: boolean | undefined;
  openNow?: boolean | undefined;
  url: string | undefined;
  small?: boolean | undefined;
  defaultSize?: number | undefined;
  badgeSize?: number | undefined;
};

export default function UserAvatar({
  isBusinessOrEmployee,
  url,
  small,
  openNow,
  defaultSize = 95,
  badgeSize = 17.5,
}: UserAvatarProps) {
  const theme = useTheme();
  const color = openNow ? theme.palette.success.main : theme.palette.grey[500];
  const boxShadow = `0 0 0 2px ${theme.palette.background.paper}`;

  const size = small ? 40 : defaultSize;

  const avatar = useMemo(
    () => (
      <Avatar
        sx={{
          width: size,
          height: size,
          border: `1px solid ${theme.palette.divider}`,
        }}
        alt="User Avatar"
        src={url ?? ""}
      />
    ),
    [url, size, theme.palette.divider]
  );

  const badgeSx = useMemo(
    () => ({
      "& .MuiBadge-badge": {
        backgroundColor: color,
        color: color,
        width: badgeSize,
        height: badgeSize,
        borderRadius: "50%",
        boxShadow,
        "&::after": {
          position: "absolute",
          top: 0,
          left: 0,
          width: badgeSize,
          height: badgeSize,
          borderRadius: "50%",
          content: '""',
        },
      },
    }),
    [color, boxShadow, badgeSize]
  );

  return (
    <>
      {!!isBusinessOrEmployee ? (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          sx={badgeSx}
        >
          {avatar}
        </Badge>
      ) : (
        avatar
      )}
    </>
  );
}
