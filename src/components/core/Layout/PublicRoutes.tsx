import React, { memo, useCallback } from "react";
import {
  Avatar,
  Badge,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
} from "@mui/material";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Session } from "next-auth";
import { AppRoutes, AppRouteValues } from "@/utils/routes";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { DRAWER_PADDING_X, ICON_SLOT_SIZE, ITEM_GAP } from "./Drawer.constants";
import Protected from "@/components/cutomized/Protected/Protected";

type ActiveView = "search" | "notifications" | "appointments" | null;

type PublicRoutesProps = {
  session: Session | null;
  isSelected: (route: AppRouteValues) => boolean;
  isCollapsed: boolean;
  activeView: ActiveView;
  onNavigate: (
    route: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  onOpenSearchView: () => void;
  onOpenNotificationsView: () => void;
  onOpenAppointmentsView: () => void;
};

export type NavigationItem = {
  label: string;
  icon: React.ReactNode;
  permission: PermissionEnum;
  route?: AppRouteValues | undefined;
  overlayView?: Exclude<ActiveView, null>;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const STATIC_ICONS = {
  explore: <VideoLibraryOutlinedIcon />,
  search: <SearchOutlinedIcon />,
  appointments: (
    <Badge badgeContent={0} color="error">
      <QueryBuilderOutlinedIcon />
    </Badge>
  ),
  notifications: (
    <Badge badgeContent={4} color="error">
      <NotificationsNoneOutlinedIcon />
    </Badge>
  ),
  personOutline: <PersonOutlineOutlinedIcon />,
  upload: <AddBoxOutlinedIcon />,
  more: <MoreHorizOutlinedIcon />,
};

const getPublicRoutes = ({
  username,
  profession,
  avatar,
  onOpenNotificationsView,
  onOpenAppointmentsView,
}: {
  username: string | undefined;
  profession: string | undefined;
  avatar: string | null | undefined;
  onOpenSearchView: () => void;
  onOpenNotificationsView: () => void;
  onOpenAppointmentsView: () => void;
}): NavigationItem[] => [
  {
    label: "Explorează",
    route: AppRoutes.home(),
    icon: STATIC_ICONS.explore,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Servicii",
    route: AppRoutes.search(),
    icon: STATIC_ICONS.search,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Rezervări",
    overlayView: "appointments",
    icon: STATIC_ICONS.appointments,
    permission: PermissionEnum.NO_PROTECTION,
    onClick: () => onOpenAppointmentsView(),
  },
  {
    label: "Notificări",
    overlayView: "notifications",
    icon: STATIC_ICONS.notifications,
    permission: PermissionEnum.NO_PROTECTION,
    onClick: () => onOpenNotificationsView(),
  },
  {
    label: "Profil",
    route:
      username && profession
        ? AppRoutes.profile(username, profession)
        : undefined,
    icon: username ? (
      <Avatar
        src={avatar ?? ""}
        alt={username}
        sx={{
          width: 32,
          height: 32,
          fontSize: 14,
          border: 1,
          borderColor: "divider",
        }}
      >
        {username.charAt(0).toUpperCase()}
      </Avatar>
    ) : (
      STATIC_ICONS.personOutline
    ),
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Upload",
    route: AppRoutes.uploadVideo(),
    icon: STATIC_ICONS.upload,
    permission: PermissionEnum.CREATE_POST,
  },
  {
    label: "Mai mult",
    route: AppRoutes.more(),
    icon: STATIC_ICONS.more,
    permission: PermissionEnum.NO_PROTECTION,
  },
];

const getIconStyles = (selected: boolean) => ({
  minWidth: "unset",
  width: ICON_SLOT_SIZE,
  height: 25,
  m: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: selected ? "primary.main" : "text.secondary",
  "& svg": {
    fontSize: 32,
  },
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    outline: selected ? "2px solid currentColor" : "none",
    outlineOffset: 2,
  },
});

const getTextStyles = (selected: boolean) => ({
  fontSize: 20,
  fontWeight: 600,
  color: selected ? "primary.main" : "text.secondary",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const buttonSx = {
  width: "100%",
  minHeight: 56,
  borderRadius: 2,
  px: `${DRAWER_PADDING_X}px`,
  py: 0.75,
  display: "grid",
  gridTemplateColumns: `${ICON_SLOT_SIZE}px minmax(0, 1fr)`,
  alignItems: "center",
  columnGap: `${ITEM_GAP}px`,
  justifyContent: "flex-start",
  bgcolor: "transparent",
  transition: "none !important",
  "&.Mui-selected": {
    bgcolor: "transparent !important",
  },
  "&:hover, &.Mui-selected:hover": {
    bgcolor: (theme: Theme) => `${theme.palette.action.hover} !important`,
  },
};

const PublicRoutes = ({
  session,
  isSelected,
  isCollapsed,
  activeView,
  onNavigate,
  onOpenSearchView,
  onOpenNotificationsView,
  onOpenAppointmentsView,
}: PublicRoutesProps) => {
  const publicRoutes = React.useMemo(
    () =>
      getPublicRoutes({
        username: session?.username,
        profession: session?.profession,
        avatar: session?.avatar,
        onOpenSearchView,
        onOpenNotificationsView,
        onOpenAppointmentsView,
      }),
    [
      session?.username,
      session?.profession,
      session?.avatar,
      onOpenSearchView,
      onOpenNotificationsView,
      onOpenAppointmentsView,
    ]
  );

  const textWrapperSx = React.useMemo(
    () => ({
      minWidth: 0,
      overflow: "hidden",
      width: isCollapsed ? 0 : "auto",
      opacity: isCollapsed ? 0 : 1,
      pointerEvents: isCollapsed ? ("none" as const) : ("auto" as const),
    }),
    [isCollapsed]
  );

  const handleItemClick = useCallback(
    (
      item: NavigationItem,
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (item.onClick) {
        item.onClick(event);
        return;
      }

      if (item.route) {
        onNavigate(item.route, event);
      }
    },
    [onNavigate]
  );

  const getItemSelected = useCallback(
    (item: NavigationItem) => {
      if (activeView) {
        return item.overlayView === activeView;
      }

      if (item.overlayView) {
        return false;
      }

      return item.route ? isSelected(item.route) : false;
    },
    [activeView, isSelected]
  );

  return (
    <>
      {publicRoutes.map((item) => {
        const selected = getItemSelected(item);

        return (
          <Protected key={item.label} permission={item.permission}>
            <ListItem disablePadding sx={{ px: 0 }}>
              <ListItemButton
                onClick={(e) => handleItemClick(item, e)}
                selected={selected}
                sx={buttonSx}
              >
                <ListItemIcon sx={getIconStyles(selected)}>
                  {item.icon}
                </ListItemIcon>

                <Box sx={textWrapperSx}>
                  <ListItemText
                    primary={
                      <Typography sx={getTextStyles(selected)}>
                        {item.label}
                      </Typography>
                    }
                  />
                </Box>
              </ListItemButton>
            </ListItem>
          </Protected>
        );
      })}
    </>
  );
};

export default memo(PublicRoutes);
