import React from "react";
import { ScrollBookerRoute } from "./MarketplaceDrawer";
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

type PublicRoutesProps = {
  session: Session | null;
  isSelected: (route: string) => boolean;
  onNavigate: (
    route: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const PublicRoutes = ({
  session,
  isSelected,
  onNavigate,
}: PublicRoutesProps) => {
  const publicRoutes: ScrollBookerRoute[] = React.useMemo(
    () => [
      {
        label: "Explorează",
        route: "/",
        icon: <VideoLibraryOutlinedIcon />,
        permission: PermissionEnum.NO_PROTECTION,
      },
      {
        label: "Caută",
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
        route: `/profile/${session?.username}`,
        icon: <PersonOutlineOutlinedIcon />,
        permission: PermissionEnum.NO_PROTECTION,
      },
      {
        label: "Mai mult",
        route: "/more",
        icon: <MoreHorizOutlinedIcon />,
        permission: PermissionEnum.NO_PROTECTION,
      },
    ],
    [session?.username]
  );

  const styles = React.useMemo(
    () => ({
      button: {
        width: "100%",
        px: 1.5,
        py: 1.25,
        borderRadius: 2,
        justifyContent: "flex-start",
        gap: 1.25,
        transition: "background-color 150ms ease, transform 120ms ease",
        bgcolor: "transparent",
        "&.Mui-selected": {
          bgcolor: "transparent !important",
        },
        "&:hover, &.Mui-selected:hover": {
          bgcolor: (theme: Theme) => `${theme.palette.action.hover} !important`,
        },
      },
      iconDefault: { color: "text.primary", "& svg": { fontSize: 32 } },
      iconSelected: { color: "primary.main", "& svg": { fontSize: 32 } },
      textDefault: { fontSize: 20, fontWeight: 600, color: "text.primary" },
      textSelected: { fontSize: 20, fontWeight: 600, color: "primary.main" },
    }),
    []
  );

  return (
    <>
      {publicRoutes.map((el) => (
        <ListItem disablePadding sx={{ px: 0 }} key={el.route}>
          <ListItemButton
            onClick={(e) => onNavigate(el.route, e)}
            selected={isSelected(el.route)}
            sx={styles.button}
          >
            <ListItemIcon
              sx={
                isSelected(el.route) ? styles.iconSelected : styles.iconDefault
              }
            >
              {el.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={
                    isSelected(el.route)
                      ? styles.textSelected
                      : styles.textDefault
                  }
                >
                  {el.label}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
};

export default PublicRoutes;
