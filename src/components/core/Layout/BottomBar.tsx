"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  useTheme,
} from "@mui/material";
import type { Theme } from "@mui/material/styles";
import type { StaticImageData } from "next/image";
import { AppRoutes } from "@/utils/routes";
import CustomSvg from "../CustomSvg/CustomSvg";
import HomeIconOutlined from "@/assets/icons/ic_home_outline.svg";
import HomeIconSolid from "@/assets/icons/ic_home_solid.svg";

import NotificationsIconOutlined from "@/assets/icons/ic_notifications_outline.svg";
import NotificationsIconSolid from "@/assets/icons/ic_notifications_solid.svg";

import SearchIcon from "@/assets/icons/ic_search.svg";

import AppointmentsIconOutlined from "@/assets/icons/ic_clipboard_outline.svg";
import AppointmentsSolidOutlined from "@/assets/icons/ic_clipboard_solid.svg";

import PersonIconOutlined from "@/assets/icons/ic_person_outline.svg";
import PersonIconSolid from "@/assets/icons/ic_person_solid.svg";

type BottomBarProps = {
  username: string | undefined;
  profession: string | undefined;
};

type BottomBarActionItem = {
  label: string;
  route: string;
  activeIcon: StaticImageData;
  inactiveIcon: StaticImageData;
  badge?: number;
};

export default function BottomBar({ username, profession }: BottomBarProps) {
  const theme = useTheme();
  const pathname = usePathname() || "/";

  const notificationsCount = 5;
  const appointmentsCount = 2;

  const isDarkPage = pathname === "/";
  const isDarkMode = theme.palette.mode === "dark";
  const isAnyVideoPage =
    (pathname.startsWith("/user") && pathname.includes("/post/")) ||
    pathname.startsWith("/feed");

  const isDarkThemeRequired = isDarkPage || isDarkMode || isAnyVideoPage;

  const activeColor = isDarkThemeRequired ? "#ffffff" : "#000000";
  const inactiveColor = isDarkThemeRequired
    ? "rgba(255, 255, 255, 0.6)"
    : "rgba(0, 0, 0, 0.6)";
  const bgColor =
    isDarkPage || isAnyVideoPage ? "#000000" : theme.palette.background.default;

  const actions: BottomBarActionItem[] = React.useMemo(
    () => [
      {
        label: "Acasă",
        route: AppRoutes.feed(),
        activeIcon: HomeIconSolid,
        inactiveIcon: HomeIconOutlined,
      },
      {
        label: "Notificări",
        route: AppRoutes.notifications(),
        activeIcon: NotificationsIconSolid,
        inactiveIcon: NotificationsIconOutlined,
        badge: notificationsCount,
      },
      {
        label: "Caută",
        route: AppRoutes.search(),
        activeIcon: SearchIcon,
        inactiveIcon: SearchIcon,
      },
      {
        label: "Rezervări",
        route: "/appointments",
        activeIcon: AppointmentsSolidOutlined,
        inactiveIcon: AppointmentsIconOutlined,
        badge: appointmentsCount,
      },
      {
        label: "Profil",
        route:
          username && profession
            ? AppRoutes.profile(username, profession)
            : AppRoutes.home(),
        activeIcon: PersonIconSolid,
        inactiveIcon: PersonIconOutlined,
      },
    ],
    [username, profession]
  );

  const currentIndex = React.useMemo(
    () =>
      actions.findIndex((a) => {
        const routePath = a.route.split("?")[0];
        if (routePath === "/") return pathname === "/";
        return pathname === routePath || pathname.startsWith(routePath + "/");
      }),
    [pathname, actions]
  );

  const containerSx = { ...styles.container, backgroundColor: bgColor };
  const navigationSx = {
    ...styles.navigation,
    backgroundColor: bgColor,
    "& .MuiBottomNavigationAction-root": {
      ...styles.action,
      color: inactiveColor,
      "&.Mui-selected": {
        ...styles.actionSelected,
        color: activeColor,
        "& .MuiBottomNavigationAction-label": {
          ...styles.actionSelectedLabel,
          color: activeColor,
        },
      },
    },
  };

  return (
    <Box sx={containerSx}>
      <BottomNavigation
        showLabels
        value={currentIndex}
        onChange={() => {}}
        sx={navigationSx}
      >
        {actions.map((a, index) => {
          const baseIcon =
            currentIndex === index ? a.activeIcon : a.inactiveIcon;

          return (
            <BottomNavigationAction
              key={a.label}
              label={a.label}
              component={Link}
              href={a.route}
              icon={
                <Badge badgeContent={a.badge} color="error" sx={styles.badge}>
                  <CustomSvg src={baseIcon} sx={styles.icon} />
                </Badge>
              }
            />
          );
        })}
      </BottomNavigation>
    </Box>
  );
}

const styles = {
  container: {
    width: "100%",
    flexShrink: 0,
    zIndex: (theme: Theme) => theme.zIndex.appBar,
    display: { xs: "block", lg: "none" },
    borderTop: "1px solid",
    borderColor: (theme: Theme) =>
      theme.palette.mode === "dark" ? "transparent" : "divider",
    marginTop: "-1px",
    transition: "background-color 0.3s ease, border-color 0.3s ease",
  },
  navigation: {
    height: "65px",
    pb: "safe-area-inset-bottom",
    transition:
      "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
  },
  action: {
    minWidth: 0,
    transition: "color 0.3s ease",
    padding: "10px 0",
    textDecoration: "none",

    "& svg, & img": {
      transition: "fill 0.3s ease, stroke 0.3s ease, color 0.3s ease",
      fill: "currentColor",
    },

    "& .MuiBottomNavigationAction-label": {
      fontSize: "0.75rem",
      transition: "color 0.3s ease",
    },
  },
  actionSelected: {
    paddingTop: "10px",

    "& svg, & img": {
      fill: "currentColor",
    },
  },
  actionSelectedLabel: {
    fontSize: "0.75rem !important",
  },
  icon: {
    color: "inherit",
    fill: "currentColor",
  },
  badge: {
    "& .MuiBadge-badge": {
      fontSize: 10,
      height: 16,
      minWidth: 16,
    },
  },
};
