"use client";

import React from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  Badge,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

type BottomBarProps = {
  username: string | undefined;
};

export default function BottomBar({ username }: BottomBarProps) {
  const theme = useTheme();
  const pathname = usePathname() || "/";
  const router = useRouter();

  const notificationsCount = 5;
  const appointmentsCount = 2;

  const isDarkPage = pathname === "/";
  const isDarkMode = theme.palette.mode === "dark";
  const isAnyVideoPage = pathname.includes("/video/");

  const getActiveColor = () => {
    if (isDarkPage || isDarkMode || isAnyVideoPage) return "#ffffff";
    return "#000000";
  };

  const getInactiveColor = () => {
    if (isDarkPage || isDarkMode || isAnyVideoPage)
      return "rgba(255, 255, 255, 0.6)";
    return "rgba(0, 0, 0, 0.6)";
  };

  const getBgColor = () => {
    if (isDarkPage || isAnyVideoPage) return "#000000 !important";
    return theme.palette.background.paper;
  };

  const actions = [
    {
      label: "Acasă",
      route: "/",
      activeIcon: <HomeIcon />,
      inactiveIcon: <HomeOutlinedIcon />,
    },
    {
      label: "Notificări",
      route: "/notifications",
      activeIcon: <NotificationsIcon />,
      inactiveIcon: <NotificationsNoneOutlinedIcon />,
      badge: notificationsCount,
    },
    {
      label: "Caută",
      route: "/search",
      activeIcon: <SearchIcon />,
      inactiveIcon: <SearchIcon />,
    },
    {
      label: "Rezervări",
      route: "/appointments",
      activeIcon: <AccessTimeFilledIcon />,
      inactiveIcon: <AccessTimeIcon />,
      badge: appointmentsCount,
    },
    {
      label: "Profil",
      route: username ? `/profile/${username}` : "/api/auth/signin",
      activeIcon: <PersonIcon />,
      inactiveIcon: <PersonOutlineOutlinedIcon />,
    },
  ];

  const currentIndex = React.useMemo(() => {
    const idx = actions.findIndex(
      (a) =>
        pathname === a.route ||
        (a.route !== "/" && pathname.startsWith(a.route + "/"))
    );
    return idx >= 0 ? idx : 0;
  }, [pathname]);

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        display: { xs: "block", lg: "none" },
        borderTop: "1px solid",
        borderColor: isDarkPage ? "transparent" : "divider",
      }}
    >
      <BottomNavigation
        showLabels
        value={currentIndex}
        onChange={(_, newValue) => {
          const route = actions[newValue]?.route;
          if (route) router.push(route);
        }}
        sx={{
          backgroundColor: getBgColor(),
          //height: 65,
          "& .MuiBottomNavigationAction-root": {
            minWidth: 0,
            color: getInactiveColor(),
            "&.Mui-selected": {
              color: getActiveColor(),
              "& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label": {
                color: getActiveColor(),
              },
            },
          },
        }}
      >
        {actions.map((a, index) => {
          const baseIcon =
            currentIndex === index ? a.activeIcon : a.inactiveIcon;

          return (
            <BottomNavigationAction
              key={a.route}
              label={a.label}
              icon={
                <Badge
                  badgeContent={a.badge}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: 10,
                      height: 16,
                      minWidth: 16,
                    },
                  }}
                >
                  {baseIcon}
                </Badge>
              }
            />
          );
        })}
      </BottomNavigation>
    </Box>
  );
}
