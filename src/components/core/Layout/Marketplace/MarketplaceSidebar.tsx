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
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { usePathname, useRouter } from "next/navigation";

const MarketplaceSidebar = () => {
  const pathname = usePathname() || "/";
  const router = useRouter();

  const items = [
    { label: "Home", route: "/", icon: <HomeIcon /> },
    {
      label: "Explorează",
      route: "/explore",
      icon: <ExploreOutlinedIcon />,
    },
    {
      label: "Notificări",
      route: "/notifications",
      icon: <NotificationsNoneOutlinedIcon />,
    },
    {
      label: "Rezervari",
      route: "/appointments",
      icon: <QueryBuilderOutlinedIcon />,
    },
    {
      label: "Profil",
      route: "/profile",
      icon: <PersonOutlineOutlinedIcon />,
    },
    {
      label: "Setari",
      route: "/settings",
      icon: <ManageAccountsOutlinedIcon />,
    },
  ];

  const navigate = (route: string) => {
    if (pathname !== route) router.push(route);
  };

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
                      fontWeight: selected ? 700 : 600,
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

      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 2.5, fontWeight: 700 }}
        onClick={() => router.push("/auth/signin")}
      >
        Conectare
      </Button>
    </Box>
  );
};

export default MarketplaceSidebar;
