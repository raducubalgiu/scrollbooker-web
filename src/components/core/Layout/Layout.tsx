"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useTheme, Theme } from "@mui/material/styles";
import { Backdrop, Box, CssBaseline, Drawer, Slide } from "@mui/material";

import MarketplaceDrawer from "./MarketplaceDrawer";
import MarketplaceBottomBar from "./MarketplaceBottomBar";
import NotificationsModule from "@/components/modules/Admin/NotificationsModule/NotificationsModule";
import AppointmentsModule from "@/components/modules/Marketplace/AppointmentsModule/AppointmentsModule";
import SearchUsersModule from "@/components/modules/Marketplace/SearchUsersModule/SearchUsersModule";

const DRAWER_WIDTH = 340;
const COLLAPSED_WIDTH = 110;
const OVERLAY_WIDTH = 450;

type ActiveView = "search" | "notifications" | "appointments" | null;

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const theme = useTheme();
  const [activeView, setActiveView] = React.useState<ActiveView>(null);

  const isCollapsed = activeView !== null;
  const handleCloseAll = React.useCallback(() => setActiveView(null), []);

  const isSpecialPage = React.useMemo(() => {
    const specialPaths = ["/business/", "/post/", "/booking/"];
    const isProfileVideo =
      pathname.startsWith("/profile/") && pathname.includes("/video/");
    return (
      isProfileVideo || specialPaths.some((path) => pathname.startsWith(path))
    );
  }, [pathname]);

  const isAdminPage = pathname.startsWith("/admin/");
  const shouldShowDrawer = !isSpecialPage;
  const bgColor =
    theme.palette.mode === "dark" ? "background.default" : "background.paper";

  const styles = React.useMemo(
    () => getStyles(theme, isCollapsed, isAdminPage, bgColor),
    [theme, isCollapsed, isAdminPage, bgColor]
  );

  const expandedDrawer = React.useMemo(() => {
    switch (activeView) {
      case "appointments":
        return <AppointmentsModule />;
      case "notifications":
        return <NotificationsModule />;
      case "search":
        return <SearchUsersModule />;
      default:
        return null;
    }
  }, [activeView]);

  const handleOpenSearch = React.useCallback(() => setActiveView("search"), []);
  const handleOpenNotifications = React.useCallback(
    () => setActiveView("notifications"),
    []
  );

  return (
    <Box sx={styles.layoutContainer}>
      <CssBaseline />

      <Backdrop
        open={isCollapsed}
        onClick={handleCloseAll}
        sx={styles.backdrop}
      />

      {shouldShowDrawer && (
        <Box component="nav" sx={styles.navWrapper}>
          <Drawer
            variant="permanent"
            open
            slotProps={{ paper: { sx: styles.drawerPaper } }}
            sx={styles.drawerRoot}
          >
            <MarketplaceDrawer
              isCollapsed={isCollapsed}
              onOpenSearchView={handleOpenSearch}
              onOpenNotificationsView={handleOpenNotifications}
            />
          </Drawer>
        </Box>
      )}

      <Slide
        in={isCollapsed}
        direction="right"
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        <Box sx={styles.overlayContainer}>
          <Box sx={styles.overlayContent}>{expandedDrawer}</Box>
        </Box>
      </Slide>

      <Box component="main" sx={styles.mainContent}>
        {children}
      </Box>

      <MarketplaceBottomBar />
    </Box>
  );
}

const getStyles = (
  theme: Theme,
  isCollapsed: boolean,
  isAdminPage: boolean,
  bgColor: string
) => ({
  layoutContainer: {
    display: "flex",
    minHeight: "100vh",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer - 2,
    bgcolor: "rgba(0, 0, 0, 0.4)",
  },
  navWrapper: {
    width: { lg: DRAWER_WIDTH },
    flexShrink: 0,
    display: { xs: "none", lg: "block" },
  },
  drawerRoot: {
    "& .MuiDrawer-paper": { transition: "none !important" },
  },
  drawerPaper: {
    width: isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
    bgcolor: bgColor,
    boxSizing: "border-box",
    boxShadow: "none",
    borderRight: "1px solid",
    borderColor: isCollapsed ? "divider" : "transparent",
    overflowX: "hidden",
    transition: "none !important",
    zIndex: theme.zIndex.drawer,
  },
  overlayContainer: {
    position: "fixed",
    left: COLLAPSED_WIDTH,
    top: 0,
    bottom: 0,
    width: OVERLAY_WIDTH,
    bgcolor: "background.paper",
    zIndex: theme.zIndex.drawer - 1,
    borderRight: "1px solid",
    borderColor: "divider",
    boxShadow: "20px 0 40px rgba(0,0,0,0.05)",
    p: 3,
    overflowY: "auto",
    "&::-webkit-scrollbar": { width: "6px" },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.divider,
      borderRadius: "10px",
    },
  },
  overlayContent: {
    opacity: isCollapsed ? 1 : 0,
    transition: "opacity 0.2s",
  },
  mainContent: {
    flexGrow: 1,
    width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
    bgcolor: isAdminPage ? "background.default" : bgColor,
    minWidth: 0,
  },
});
