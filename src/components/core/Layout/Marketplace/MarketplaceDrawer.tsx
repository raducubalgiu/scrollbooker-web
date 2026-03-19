"use client";

import React from "react";
import {
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
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Protected from "@/components/cutomized/Protected/Protected";
import CButton from "../../CButton/CButton";

const MarketplaceDrawer = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const pathname = usePathname() || "/";
  const router = useRouter();

  const items = React.useMemo(
    () => [
      { label: "Caută", route: "/", icon: <SearchOutlinedIcon /> },
      {
        label: "Explorează",
        route: "/explore",
        icon: <VideoLibraryOutlinedIcon />,
      },
      {
        label: "Notificări",
        route: "/notifications",
        icon: <NotificationsNoneOutlinedIcon />,
      },
      {
        label: "Rezervări",
        route: "/appointments",
        icon: <QueryBuilderOutlinedIcon />,
      },
      {
        label: "Profil",
        route: "/profile",
        icon: <PersonOutlineOutlinedIcon />,
      },
      { label: "Mai mult", route: "/more", icon: <MoreHorizOutlinedIcon /> },
    ],
    []
  );

  const navigate = React.useCallback(
    (route: string) => {
      if (pathname !== route) router.push(route);
    },
    [pathname, router]
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
      iconDefault: { color: "text.secondary", "& svg": { fontSize: 30 } },
      iconSelected: { color: "primary.main", "& svg": { fontSize: 30 } },
      textDefault: { fontSize: 20, fontWeight: 600, color: "text.secondary" },
      textSelected: { fontSize: 20, fontWeight: 600, color: "primary.main" },
    }),
    []
  );

  const ItemRow = React.useMemo(() => {
    type Props = {
      item: { label: string; route: string; icon: React.ReactNode };
      selected: boolean;
      onNavigate: (r: string) => void;
    };

    const Row: React.FC<Props> = ({ item, selected, onNavigate }) => {
      return (
        <ListItem disablePadding sx={{ px: 0 }} key={item.route}>
          <ListItemButton
            onClick={() => onNavigate(item.route)}
            selected={selected}
            sx={styles.button}
          >
            <ListItemIcon
              sx={selected ? styles.iconSelected : styles.iconDefault}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={selected ? styles.textSelected : styles.textDefault}
                >
                  {item.label}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      );
    };

    return React.memo(Row);
  }, [styles]);

  return (
    <Box sx={{ p: 2.5 }}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        fontWeight={600}
        fontSize={30}
        sx={{ mb: 2.5 }}
      >
        ScrollBooker
      </Typography>
      <Box>
        {items.map((it) => {
          const selected =
            pathname === it.route || pathname.startsWith(it.route + "/");
          const Row = ItemRow;
          return (
            <Row
              key={it.route}
              item={it}
              selected={selected}
              onNavigate={navigate}
            />
          );
        })}

        {!isAuthenticated && (
          <CButton
            onClick={() => router.push("/api/auth/signin")}
            label="Conectare"
            sx={{ mt: 2.5 }}
          />
        )}

        {isAuthenticated && (
          <Protected permission="ADMIN_BUTTON_VIEW">
            <CButton
              variant="outlined"
              onClick={() => router.push("/admin/calendar")}
              label="Admin Panel"
              sx={{ mt: 2.5 }}
            />
          </Protected>
        )}
      </Box>
    </Box>
  );
};

export default MarketplaceDrawer;
