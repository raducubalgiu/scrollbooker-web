"use client";

import React from "react";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import { StaticImageData } from "next/image";
import { AppRoutes } from "@/utils/routes";

import HomeIconOutlined from "@/assets/icons/ic_home_outline.svg";
import HomeIconSolid from "@/assets/icons/ic_home_solid.svg";

import NotificationsIconOutlined from "@/assets/icons/ic_notifications_outline.svg";
import NotificationsIconSolid from "@/assets/icons/ic_notifications_solid.svg";

import SearchIcon from "@/assets/icons/ic_search.svg";

import AppointmentsIconOutlined from "@/assets/icons/ic_clipboard_outline.svg";
import AppointmentsSolidOutlined from "@/assets/icons/ic_clipboard_solid.svg";

import PersonIconOutlined from "@/assets/icons/ic_person_outline.svg";
import PersonIconSolid from "@/assets/icons/ic_person_solid.svg";
import CustomSvg from "../CustomSvg/CustomSvg";

type BottomBarProps = {
  username: string | undefined;
  profession: string | undefined;
};

type BottomBarActionItem = {
  label: string;
  route: string | undefined;
  activeIcon: StaticImageData;
  inactiveIcon: StaticImageData;
  badge?: number;
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
    return theme.palette.background.default;
  };

  const actions: BottomBarActionItem[] = React.useMemo(
    () => [
      {
        label: "Acasă",
        route: AppRoutes.home(),
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
            : undefined,
        activeIcon: PersonIconSolid,
        inactiveIcon: PersonIconOutlined,
      },
    ],
    [username, profession]
  );

  const currentIndex = React.useMemo(() => {
    return actions.findIndex((a) => {
      if (!a.route) return false;
      const routePath = a.route.split("?")[0];
      if (routePath === "/") return pathname === "/";
      return pathname === routePath || pathname.startsWith(routePath + "/");
    });
  }, [pathname, actions]);

  return (
    <Box
      sx={{
        ...styles.container,
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
          backgroundColor: getBgColor(),
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
                <Badge badgeContent={a.badge} color="error" sx={styles.badge}>
                  <CustomSvg src={baseIcon} />
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
  },
  badge: {
    "& .MuiBadge-badge": {
      fontSize: 10,
      height: 16,
      minWidth: 16,
    },
  },
};
