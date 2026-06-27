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
import { AppRoutes } from "@/utils/routes";

type BottomBarProps = {
  username: string | undefined;
  profession: string | undefined;
};

export default function BottomBar({ username, profession }: BottomBarProps) {
  const theme = useTheme();
  const pathname = usePathname() || "/";
  const router = useRouter();

  const notificationsCount = 5;
  const appointmentsCount = 2;

  const isDarkPage = pathname === "/";
  const isDarkMode = theme.palette.mode === "dark";
  const isAnyVideoPage =
    pathname.startsWith("/user") && pathname.includes("/post/");

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
    return theme.palette.mode === "dark"
      ? theme.palette.background.default
      : theme.palette.background.paper;
  };

  const actions = React.useMemo(
    () => [
      {
        label: "Acasă",
        route: AppRoutes.home(),
        activeIcon: <HomeIcon />,
        inactiveIcon: <HomeOutlinedIcon />,
      },
      {
        label: "Notificări",
        route: AppRoutes.notifications(),
        activeIcon: <NotificationsIcon />,
        inactiveIcon: <NotificationsNoneOutlinedIcon />,
        badge: notificationsCount,
      },
      {
        label: "Caută",
        route: AppRoutes.search(),
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
        route:
          username && profession
            ? AppRoutes.profile(username, profession)
            : undefined,
        activeIcon: <PersonIcon />,
        inactiveIcon: <PersonOutlineOutlinedIcon />,
      },
    ],
    [username, profession, notificationsCount, appointmentsCount]
  );

  const currentIndex = React.useMemo(() => {
    const idx = actions.findIndex(
      (a) =>
        pathname === a.route ||
        (a.route !== "/" && pathname.startsWith(a.route + "/"))
    );
    return idx >= 0 ? idx : 0;
  }, [pathname, actions]);

  return (
    <Box
      sx={{
        width: "100%",
        flexShrink: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        display: { xs: "block", lg: "none" },
        borderTop: "1px solid",
        borderColor: isDarkPage ? "transparent" : "divider",
        marginTop: "-1px",

        backgroundColor: getBgColor(),
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
          height: "65px",
          backgroundColor: getBgColor(),
          pb: "safe-area-inset-bottom",
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
              key={a.label}
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
