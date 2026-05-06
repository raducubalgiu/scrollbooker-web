"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme, Theme } from "@mui/material/styles";
import { Backdrop, Box, CssBaseline, Drawer, Slide } from "@mui/material";

import NotificationsModule from "@/components/modules/Admin/NotificationsModule/NotificationsModule";
import AppointmentsModule from "@/components/modules/Marketplace/AppointmentsModule/AppointmentsModule";
import SearchUsersModule from "@/components/modules/Marketplace/SearchUsersModule/SearchUsersModule";
import LayoutDrawer from "./LayoutDrawer";
import BottomBar from "./BottomBar";
import { useSession } from "next-auth/react";

const DRAWER_WIDTH = 340;
const COLLAPSED_WIDTH = 110;
const OVERLAY_WIDTH = 500;

export type ActiveView = "search" | "notifications" | "appointments" | null;

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const isSessionLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const router = useRouter();
  const pathname = usePathname() || "";
  const theme = useTheme();
  const overlayScrollRef = React.useRef<HTMLDivElement | null>(null);

  const [activeView, setActiveView] = React.useState<ActiveView>(null);
  const [isDrawerCollapsed, setIsDrawerCollapsed] = React.useState(false);

  const isOverlayOpen = activeView !== null;

  const visualDrawerCollapsed = isOverlayOpen || isDrawerCollapsed;
  const navWidth = isOverlayOpen
    ? DRAWER_WIDTH
    : isDrawerCollapsed
      ? COLLAPSED_WIDTH
      : DRAWER_WIDTH;

  const handleCloseAll = React.useCallback(() => setActiveView(null), []);

  const handleToggleDrawer = React.useCallback(() => {
    if (isOverlayOpen) {
      setActiveView(null);
      return;
    }

    setIsDrawerCollapsed((prev) => !prev);
  }, [isOverlayOpen]);

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
    () =>
      getStyles(
        theme,
        {
          isOverlayOpen,
          visualDrawerCollapsed,
          navWidth,
        },
        isAdminPage,
        bgColor
      ),
    [
      theme,
      isOverlayOpen,
      visualDrawerCollapsed,
      navWidth,
      isAdminPage,
      bgColor,
    ]
  );

  const expandedDrawer = React.useMemo(() => {
    switch (activeView) {
      case "appointments":
        return (
          <AppointmentsModule
            scrollRootRef={overlayScrollRef}
            onNavigateToAppointment={(appointmentId) => {
              handleCloseAll();
              router.push(`/appointments/${appointmentId}`);
            }}
          />
        );
      case "notifications":
        return (
          <NotificationsModule
            scrollRootRef={overlayScrollRef}
            onNavigateToUserProfile={(username) => {
              handleCloseAll();
              router.push(`/profile/${username}`);
            }}
          />
        );
      case "search":
        return (
          <SearchUsersModule
            onNavigateToUserProfile={(username) => {
              handleCloseAll();
              router.push(`/profile/${username}`);
            }}
          />
        );
      default:
        return null;
    }
  }, [activeView, handleCloseAll, router]);

  const handleOpenSearch = React.useCallback(
    () =>
      activeView === "search" ? handleCloseAll() : setActiveView("search"),
    [activeView]
  );

  const handleOpenNotifications = React.useCallback(
    () =>
      activeView === "notifications"
        ? handleCloseAll()
        : setActiveView("notifications"),
    [activeView]
  );

  const handleOpenAppointments = React.useCallback(
    () =>
      activeView === "appointments"
        ? handleCloseAll()
        : setActiveView("appointments"),
    [activeView]
  );

  React.useEffect(() => {
    if (overlayScrollRef.current) {
      overlayScrollRef.current.scrollTop = 0;
    }
  }, [activeView]);

  return (
    <Box sx={styles.layoutContainer}>
      <CssBaseline />

      <Backdrop
        open={isOverlayOpen}
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
          md: {
            p: isSpecialPage ? 0 : 2.5,
          },
        }}
      >
        {children}
      </Box>

      <BottomBar username={session?.username} />
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
  isAdminPage: boolean,
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
      bgcolor: isAdminPage ? "background.default" : bgColor,
    },
  };
};
