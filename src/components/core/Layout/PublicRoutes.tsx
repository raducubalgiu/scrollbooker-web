import React, { memo } from "react";
import {
  Badge,
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
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { Session } from "next-auth";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

type PublicRoutesProps = {
  session: Session | null;
  isSelected: (route: string) => boolean;
  isCollapsed: boolean;
  onNavigate: (
    route: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const GET_PUBLIC_ROUTES = (username?: string) => [
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
    route: "/notifications",
    icon: (
      <Badge badgeContent={4} color="error">
        <NotificationsNoneOutlinedIcon />
      </Badge>
    ),
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Profil",
    route: `/profile/${username}`,
    icon: <PersonOutlineOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Upload",
    route: `/upload-video`,
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
}: PublicRoutesProps) => {
  const publicRoutes = React.useMemo(
    () => GET_PUBLIC_ROUTES(session?.username),
    [session?.username]
  );

  const styles = React.useMemo(
    () => ({
      button: {
        width: "100%",
        py: 1.25,
        borderRadius: 2,
        px: isCollapsed ? 0 : 1.5,
        justifyContent: isCollapsed ? "center" : "flex-start",
        gap: isCollapsed ? 0 : 1.25,
        minHeight: 56,
        transition: "none !important",
        bgcolor: "transparent",
        "&.Mui-selected": {
          bgcolor: "transparent !important",
        },
        "&:hover, &.Mui-selected:hover": {
          bgcolor: (theme: Theme) => `${theme.palette.action.hover} !important`,
        },
      },
      getIconStyles: (selected: boolean) => ({
        minWidth: isCollapsed ? 0 : 40,
        justifyContent: "center",
        display: "flex",
        color: selected ? "primary.main" : "text.secondary",
        "& svg": { fontSize: 32 },
      }),
      getTextStyles: (selected: boolean) => ({
        fontSize: 20,
        fontWeight: 600,
        color: selected ? "primary.main" : "text.secondary",
        display: isCollapsed ? "none" : "block",
        whiteSpace: "nowrap",
      }),
    }),
    [isCollapsed]
  );

  return (
    <>
      {publicRoutes.map((el) => {
        const selected = isSelected(el.route);
        return (
          <ListItem disablePadding sx={{ px: 0 }} key={el.route}>
            <ListItemButton
              onClick={(e) => onNavigate(el.route, e)}
              selected={selected}
              sx={styles.button}
            >
              <ListItemIcon sx={styles.getIconStyles(selected)}>
                {el.icon}
              </ListItemIcon>

              {!isCollapsed && (
                <ListItemText
                  primary={
                    <Typography sx={styles.getTextStyles(selected)}>
                      {el.label}
                    </Typography>
                  }
                />
              )}
            </ListItemButton>
          </ListItem>
        );
      })}
    </>
  );
};

export default memo(PublicRoutes);
