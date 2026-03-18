import React, { useMemo } from "react";
import { Badge, Avatar, useTheme } from "@mui/material";

type UserAvatarProps = {
  isBusinessOrEmployee: boolean | undefined;
  openNow?: boolean | undefined;
  url: string | undefined;
  onOpenModal: () => void;
  small?: boolean;
};

export default function UserAvatar({
  isBusinessOrEmployee,
  url,
  onOpenModal,
  small,
  openNow,
}: UserAvatarProps) {
  const theme = useTheme();
  const offlineGray =
    theme.palette.mode === "light"
      ? theme.palette.grey[500]
      : theme.palette.grey[600];
  const color = openNow ? theme.palette.success.main : offlineGray;

  const size = small ? 40 : 95;

  const avatar = useMemo(
    () => (
      <Avatar
        sx={{
          width: size,
          height: size,
          border: `1px solid ${theme.palette.divider}`,
        }}
        alt="User Avatar"
        src={url}
      />
    ),
    [url, size, theme.palette.divider]
  );

  const badgeSx = {
    "& .MuiBadge-badge": {
      backgroundColor: color,
      color: color,
      width: 17.5,
      height: 17.5,
      borderRadius: "50%",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: 17.5,
        height: 17.5,
        borderRadius: "50%",
        content: '""',
      },
    },
  } as const;

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
