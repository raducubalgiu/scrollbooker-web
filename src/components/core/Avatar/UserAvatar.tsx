import { Avatar, Badge, Box, SxProps, Theme, useTheme } from "@mui/material";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

type ResponsiveAvatarSize =
  | AvatarSize
  | Partial<Record<"xs" | "sm" | "md" | "lg" | "xl", AvatarSize>>;

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
  size?: ResponsiveAvatarSize; // Tipul actualizat
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

  // Funcție helper pentru a extrage valorile din SIZE_MAP în funcție de breakpoint
  const getResponsiveValue = (property: keyof SizeConfig) => {
    if (typeof size === "string") {
      return SIZE_MAP[size][property];
    }

    // Dacă size este un obiect { xs: 'md', md: 'xxl' }
    const responsiveStyles: any = {};
    Object.entries(size).forEach(([breakpoint, s]) => {
      responsiveStyles[breakpoint] = SIZE_MAP[s as AvatarSize][property];
    });
    return responsiveStyles;
  };

  const color = (
    openNow ? theme.palette.success.main : theme.palette.text.disabled
  ) as string;
  const boxShadow = `0 0 0 2px ${theme.palette.background.paper}`;

  const badgeSx: SxProps<Theme> = {
    "& .MuiBadge-badge": {
      backgroundColor: color,
      width: getResponsiveValue("badge"),
      height: getResponsiveValue("badge"),
      minWidth: getResponsiveValue("badge"),
      borderRadius: "50%",
      boxShadow,
      "&::after": {
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        content: '""',
      },
    },
  };

  const avatarContent = (
    <Box
      sx={{
        position: "relative",
        width: getResponsiveValue("avatar"),
        height: getResponsiveValue("avatar"),
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
    return <Box sx={{ display: "inline-flex" }}>{avatarContent}</Box>;
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
