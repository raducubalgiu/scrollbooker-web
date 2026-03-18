"use client";

import React from "react";
import {
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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

const MarketplaceSidebar = () => {
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

  return (
    <Box>
      {items.map((it) => {
        const selected =
          pathname === it.route || pathname.startsWith(it.route + "/");

        return (
          <ListItem disablePadding sx={{ px: 0 }} key={it.route}>
            <ListItemButton
              onClick={() => navigate(it.route)}
              selected={selected}
              sx={{
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
                  bgcolor: (theme) =>
                    `${theme.palette.action.hover} !important`,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: selected ? "primary.main" : "text.secondary",
                  "& svg": { fontSize: 30 },
                }}
              >
                {it.icon}
              </ListItemIcon>

              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: selected ? "primary.main" : "text.secondary",
                    }}
                  >
                    {it.label}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}

      {!isAuthenticated && (
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 2.5, fontWeight: 700 }}
          onClick={() => router.push("/api/auth/signin")}
        >
          Conectare
        </Button>
      )}

      {isAuthenticated && (
        <Protected permission="ADMIN_BUTTON_VIEW">
          <Button
            variant="outlined"
            size="large"
            fullWidth
            sx={{ mt: 2.5, fontWeight: 700 }}
            onClick={() => router.push("/admin/calendar")}
          >
            Admin panel
          </Button>
        </Protected>
      )}
    </Box>
  );
};

export default MarketplaceSidebar;
