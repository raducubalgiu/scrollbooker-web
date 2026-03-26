import React, { useMemo } from "react";
import Image from "next/image";
import { Badge, Box, useTheme } from "@mui/material";

type UserAvatarProps = {
  isBusinessOrEmployee: boolean;
  openNow?: boolean | null;
  url?: string | null;
  small: boolean | null;
  defaultSize?: number | null;
  badgeSize?: number | null;
  alt?: string;
};

export default function UserAvatar({
  isBusinessOrEmployee,
  url,
  small = false,
  openNow,
  defaultSize = 95,
  badgeSize = 17.5,
  alt = "User avatar",
}: UserAvatarProps) {
  const theme = useTheme();

  const color = openNow ? theme.palette.success.main : theme.palette.grey[500];

  const boxShadow = `0 0 0 2px ${theme.palette.background.paper}`;
  const size = small ? 40 : defaultSize;

  const badgeSx = useMemo(
    () => ({
      "& .MuiBadge-badge": {
        backgroundColor: color,
        width: badgeSize,
        height: badgeSize,
        minWidth: badgeSize,
        borderRadius: "50%",
        boxShadow,
        "&::after": {
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          content: '""',
        },
      },
    }),
    [color, boxShadow, badgeSize]
  );

  const avatarContent = (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.action.hover,
        flexShrink: 0,
      }}
    >
      {url && (
        <Image
          src={url}
          alt={alt}
          fill
          sizes={`${size}px`}
          style={{
            objectFit: "cover",
          }}
        />
      )}
    </Box>
  );

  if (!isBusinessOrEmployee) {
    return avatarContent;
  }

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      sx={badgeSx}
    >
      {avatarContent}
    </Badge>
  );
}
