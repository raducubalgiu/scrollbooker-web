"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useTheme, Theme } from "@mui/material/styles";
import { Backdrop, Box, CssBaseline, Drawer, Slide } from "@mui/material";

import NotificationsModule from "@/components/modules/Marketplace/NotificationsModule/NotificationsModule";
import AppointmentsModule from "@/components/modules/Marketplace/AppointmentsModule/AppointmentsModule";
import SearchUsersModule from "@/components/modules/Marketplace/SearchUsersModule/SearchUsersModule";
import LayoutDrawer from "./LayoutDrawer";
import BottomBar from "./BottomBar";
import { useSession } from "next-auth/react";
import { AppRoutes, useAppNavigation } from "@/utils/routes";

const DRAWER_WIDTH = 340;
const COLLAPSED_WIDTH = 110;
const OVERLAY_WIDTH = 500;

export type ActiveView = "search" | "notifications" | "appointments" | null;

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const theme = useTheme();
  const { data: session, status } = useSession();
  const { navigateTo } = useAppNavigation();

  const [activeView, setActiveView] = React.useState<ActiveView>(null);
  const [isDrawerCollapsed, setIsDrawerCollapsed] = React.useState(false);

  const overlayScrollRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (overlayScrollRef.current) {
      overlayScrollRef.current.scrollTop = 0;
    }
  }, [activeView]);

  const isNoLayoutPage = React.useMemo(() => {
    if (!pathname) return true;

    const staticPaths = ["/unauthorized", "/_not-found"];
    if (staticPaths.includes(pathname)) return true;

    const cleanPrefixes = [
      "/auth",
      "/onboarding",
      "/business/",
      "/booking/",
      "/employment-request",
    ];

    return cleanPrefixes.some((prefix) => pathname.startsWith(prefix));
  }, [pathname]);

  const isSessionLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const isOverlayOpen = activeView !== null;
  const visualDrawerCollapsed = isOverlayOpen || isDrawerCollapsed;

  const navWidth = isOverlayOpen
    ? DRAWER_WIDTH
    : isDrawerCollapsed
      ? COLLAPSED_WIDTH
      : DRAWER_WIDTH;

  const isVideoPage =
    pathname.startsWith("/user/") && pathname.includes("/post/");
  const isAdminPage = pathname.startsWith("/admin/");

  const bgColor =
    theme.palette.mode === "dark" ? "background.default" : "background.paper";

  const styles = React.useMemo(
    () =>
      getStyles(
        theme,
        { isOverlayOpen, visualDrawerCollapsed, navWidth },
        bgColor
      ),
    [theme, isOverlayOpen, visualDrawerCollapsed, navWidth, bgColor]
  );

  const handleCloseAll = React.useCallback(() => setActiveView(null), []);

  const handleToggleDrawer = React.useCallback(() => {
    if (isOverlayOpen) {
      setActiveView(null);
      return;
    }
    setIsDrawerCollapsed((prev) => !prev);
  }, [isOverlayOpen]);

  const handleOpenSearch = React.useCallback(
    () =>
      activeView === "search" ? handleCloseAll() : setActiveView("search"),
    [activeView, handleCloseAll]
  );

  const handleOpenNotifications = React.useCallback(
    () =>
      activeView === "notifications"
        ? handleCloseAll()
        : setActiveView("notifications"),
    [activeView, handleCloseAll]
  );

  const handleOpenAppointments = React.useCallback(
    () =>
      activeView === "appointments"
        ? handleCloseAll()
        : setActiveView("appointments"),
    [activeView, handleCloseAll]
  );

  const expandedDrawer = React.useMemo(() => {
    switch (activeView) {
      case "appointments":
        return (
          <AppointmentsModule
            scrollRootRef={overlayScrollRef}
            onNavigateToAppointment={(appointmentId) => {
              handleCloseAll();
              navigateTo(AppRoutes.appointmentDetails(appointmentId));
            }}
          />
        );
      case "notifications":
        return (
          <NotificationsModule
            scrollRootRef={overlayScrollRef}
            onNavigateToUserProfile={(username, profession) => {
              handleCloseAll();
              navigateTo(AppRoutes.profile(username, profession));
            }}
            onNavigateToEmploymentRequest={(employmentRequestId) => {
              handleCloseAll();
              navigateTo(AppRoutes.employmentRequest(employmentRequestId));
            }}
          />
        );
      case "search":
        return (
          <SearchUsersModule
            onNavigateToUserProfile={(username, profession) => {
              handleCloseAll();
              navigateTo(AppRoutes.profile(username, profession));
            }}
          />
        );
      default:
        return null;
    }
  }, [activeView, handleCloseAll, navigateTo]);

  if (isNoLayoutPage) {
    return <>{children}</>;
  }

  return (
    <Box sx={styles.layoutContainer}>
      <CssBaseline />

      <Backdrop
        open={isOverlayOpen}
        onClick={handleCloseAll}
        sx={styles.backdrop}
      />

      {!isVideoPage && (
        <Box component="nav" sx={styles.navWrapper}>
          <Drawer
            variant="permanent"
            open
            slotProps={{ paper: { sx: styles.drawerPaper } }}
            sx={styles.drawerRoot}
          >
            <LayoutDrawer
              session={session}
              isSessionLoading={isSessionLoading}
              isAuthenticated={isAuthenticated}
              isCollapsed={visualDrawerCollapsed}
              activeView={activeView}
              onOpenSearchView={handleOpenSearch}
              onOpenNotificationsView={handleOpenNotifications}
              onOpenAppointmentsView={handleOpenAppointments}
              onToggleDrawer={handleToggleDrawer}
            />
          </Drawer>
        </Box>
      )}

      <Slide
        in={isOverlayOpen}
        direction="right"
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        <Box ref={overlayScrollRef} sx={styles.overlayContainer}>
          <Box key={activeView} sx={styles.overlayContent}>
            {expandedDrawer}
          </Box>
        </Box>
      </Slide>

      <Box
        component="main"
        sx={{
          ...styles.mainContent,
          bgcolor: isAdminPage ? "background.default" : bgColor,
          p: { xs: isAdminPage ? 2.5 : 0, md: isNoLayoutPage ? 0 : 2.5 },
          pb: { xs: "65px", lg: 0 },
        }}
      >
        {children}
      </Box>

      <BottomBar
        username={session?.username}
        profession={session?.profession}
      />
    </Box>
  );
}

const getStyles = (
  theme: Theme,
  layoutState: {
    isOverlayOpen: boolean;
    visualDrawerCollapsed: boolean;
    navWidth: number;
  },
  bgColor: string
) => {
  const { isOverlayOpen, visualDrawerCollapsed, navWidth } = layoutState;

  return {
    layoutContainer: {
      display: "flex",
      minHeight: "100vh",
    },

    backdrop: {
      zIndex: theme.zIndex.drawer - 2,
      bgcolor: "rgba(0, 0, 0, 0.4)",
    },

    navWrapper: {
      width: { lg: `${navWidth}px` },
      flexShrink: 0,
      display: { xs: "none", lg: "block" },
      transition: "width 220ms ease",
    },

    drawerRoot: {
      "& .MuiDrawer-paper": {
        transition: "width 220ms ease",
      },
    },

    drawerPaper: {
      width: visualDrawerCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
      bgcolor: bgColor,
      boxSizing: "border-box",
      boxShadow: "none",
      borderRight: "1px solid",
      borderColor: visualDrawerCollapsed ? "divider" : "transparent",
      overflowX: "hidden",
      zIndex: theme.zIndex.drawer,
      transition: "width 220ms ease, border-color 220ms ease",
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
      pb: 3,
      overflowY: "auto",
      "&::-webkit-scrollbar": { width: "6px" },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.divider,
        borderRadius: "10px",
      },
    },

    overlayContent: {
      opacity: isOverlayOpen ? 1 : 0,
      transition: "opacity 0.2s",
    },

    mainContent: {
      flexGrow: 1,
      width: { lg: `calc(100% - ${navWidth}px)` },
      minWidth: 0,
      transition: "width 220ms ease",
    },
  };
};
