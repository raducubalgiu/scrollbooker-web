import React, { memo } from "react";
import {
  Badge,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { Session } from "next-auth";

type PublicRoutesProps = {
  session: Session | null;
  isSelected: (route: string) => boolean;
  isCollapsed: boolean;
  onNavigate: (
    route: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  onOpenNotificationsView: () => void;
};

type NavigationItem = {
  label: string;
  icon: React.ReactNode;
  permission: PermissionEnum;
  route?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const DRAWER_PADDING_X = 15;
const ICON_SLOT_SIZE = 72;
const ITEM_GAP = 10;

const getPublicRoutes = ({
  username,
  onOpenNotificationsView,
}: {
  username: string | undefined;
  onOpenNotificationsView: () => void;
}): NavigationItem[] => [
  {
    label: "Explorează",
    route: "/",
    icon: <VideoLibraryOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Rezervă pe hartă",
    route: "/search",
    icon: <SearchOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Rezervări",
    route: "/appointments",
    icon: (
      <Badge badgeContent={0} color="error">
        <QueryBuilderOutlinedIcon />
      </Badge>
    ),
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Notificări",
    icon: (
      <Badge badgeContent={4} color="error">
        <NotificationsNoneOutlinedIcon />
      </Badge>
    ),
    permission: PermissionEnum.NO_PROTECTION,
    onClick: () => onOpenNotificationsView(),
  },
  {
    label: "Profil",
    route: username ? `/profile/${username}` : "/api/auth/signin",
    icon: <PersonOutlineOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Upload",
    route: "/upload-video",
    icon: <AddBoxOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Mai mult",
    route: "/more",
    icon: <MoreHorizOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
];

const PublicRoutes = ({
  session,
  isSelected,
  isCollapsed,
  onNavigate,
  onOpenNotificationsView,
}: PublicRoutesProps) => {
  const publicRoutes = React.useMemo(
    () =>
      getPublicRoutes({
        username: session?.username,
        onOpenNotificationsView,
      }),
    [session?.username, onOpenNotificationsView]
  );

  const styles = React.useMemo(
    () => ({
      button: {
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
      },

      getIconStyles: (selected: boolean) => ({
        minWidth: "unset",
        width: ICON_SLOT_SIZE,
        height: 56,
        m: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: selected ? "primary.main" : "text.secondary",
        "& svg": {
          fontSize: 32,
        },
      }),

      textWrapper: {
        minWidth: 0,
        overflow: "hidden",
        width: isCollapsed ? 0 : "auto",
        opacity: isCollapsed ? 0 : 1,
        pointerEvents: isCollapsed ? "none" : "auto",
      },

      getTextStyles: (selected: boolean) => ({
        fontSize: 20,
        fontWeight: 600,
        color: selected ? "primary.main" : "text.secondary",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }),
    }),
    [isCollapsed]
  );

  const handleItemClick = React.useCallback(
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

  return (
    <>
      {publicRoutes.map((item) => {
        const selected = item.route ? isSelected(item.route) : false;

        return (
          <ListItem disablePadding sx={{ px: 0 }} key={item.label}>
            <ListItemButton
              onClick={(e) => handleItemClick(item, e)}
              selected={selected}
              sx={styles.button}
            >
              <ListItemIcon sx={styles.getIconStyles(selected)}>
                {item.icon}
              </ListItemIcon>

              <Box sx={styles.textWrapper}>
                <ListItemText
                  primary={
                    <Typography sx={styles.getTextStyles(selected)}>
                      {item.label}
                    </Typography>
                  }
                />
              </Box>
            </ListItemButton>
          </ListItem>
        );
      })}
    </>
  );
};

export default memo(PublicRoutes);
