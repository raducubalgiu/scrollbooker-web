import React, { useMemo } from "react";
import { Avatar, Badge, Box, SxProps, Theme, useTheme } from "@mui/material";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

type SizeConfig = {
  avatar: number;
  badge: number;
};

const SIZE_MAP: Record<AvatarSize, SizeConfig> = {
  xs: { avatar: 32, badge: 8 },
  sm: { avatar: 48, badge: 10 },
  md: { avatar: 64, badge: 12 },
  lg: { avatar: 96, badge: 16 },
  xl: { avatar: 128, badge: 20 },
  xxl: { avatar: 250, badge: 25 },
};

type UserAvatarProps = {
  isBusinessOrEmployee: boolean;
  openNow?: boolean | null;
  size?: AvatarSize;
  url?: string | null;
  alt?: string;
};

export default function UserAvatar({
  isBusinessOrEmployee,
  url,
  openNow,
  alt = "User avatar",
  size = "md",
}: UserAvatarProps) {
  const theme = useTheme();
  const { avatar, badge } = SIZE_MAP[size];

  const color = openNow ? theme.palette.success.main : theme.palette.grey[500];
  const boxShadow = `0 0 0 2px ${theme.palette.background.paper}`;

  const badgeSx = useMemo<SxProps<Theme>>(
    () => ({
      "& .MuiBadge-badge": {
        backgroundColor: color,
        width: badge,
        height: badge,
        minWidth: badge,
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
    [color, boxShadow, badge]
  );

  const avatarContent = (
    <Box
      sx={{
        position: "relative",
        width: avatar,
        height: avatar,
        borderRadius: "50%",
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.action.hover,
        flexShrink: 0,
      }}
    >
      <Avatar
        src={url ?? ""}
        alt={alt}
        sx={{ width: "100%", height: "100%" }}
      />
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
