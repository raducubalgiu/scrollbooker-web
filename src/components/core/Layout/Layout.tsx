"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useTheme, Theme } from "@mui/material/styles";
import { Backdrop, Box, Drawer, Slide } from "@mui/material";

import LayoutDrawer from "./LayoutDrawer";
import BottomBar from "./BottomBar";
import { useSession } from "next-auth/react";
import LayoutOverlayContent from "./LayoutOverlayContent";

const DRAWER_WIDTH = 340;
const COLLAPSED_WIDTH = 110;
const OVERLAY_WIDTH = 500;

export type ActiveView = "search" | "notifications" | "appointments" | null;

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const theme = useTheme();
  const { data: session, status } = useSession();

  const [activeView, setActiveView] = React.useState<ActiveView>(null);
  const [isDrawerCollapsed, setIsDrawerCollapsed] = React.useState(false);

  const overlayScrollRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (overlayScrollRef.current) {
      overlayScrollRef.current.scrollTop = 0;
    }
  }, [activeView]);

  const isSessionLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const isExplicitNoLayoutPage = [
    "/",
    "/unauthorized",
    "/_not-found",
    "/auth",
    "/onboarding",
    "/business/",
    "/booking/",
    "/employment-request",
  ].some((p) => (p === "/" ? pathname === "/" : pathname.startsWith(p)));

  const isNoLayoutPage =
    isExplicitNoLayoutPage || (!isSessionLoading && !isAuthenticated);

  const isVideoPage =
    pathname.startsWith("/user/") && pathname.includes("/post/");

  const isSettingsPage = pathname.startsWith("/settings");
  const previousIsSettingsPageRef = React.useRef(isSettingsPage);
  const isEnteringOrLeavingSettings =
    previousIsSettingsPageRef.current !== isSettingsPage;

  React.useEffect(() => {
    previousIsSettingsPageRef.current = isSettingsPage;
  }, [isSettingsPage]);

  const isPageWithoutBottomBar =
    pathname.startsWith("/admin") ||
    isSettingsPage ||
    pathname.startsWith("/upload-video") ||
    isVideoPage;
  const isOverlayOpen = activeView !== null;
  const visualDrawerCollapsed = isOverlayOpen || isDrawerCollapsed;

  const navWidth = isSettingsPage
    ? 0
    : isOverlayOpen
      ? DRAWER_WIDTH
      : isDrawerCollapsed
        ? COLLAPSED_WIDTH
        : DRAWER_WIDTH;

  const styles = React.useMemo(
    () =>
      getStyles(theme, {
        isOverlayOpen,
        visualDrawerCollapsed,
        navWidth,
        isVideoPage,
        animateWidth: !isEnteringOrLeavingSettings,
      }),
    [
      theme,
      isOverlayOpen,
      visualDrawerCollapsed,
      navWidth,
      isVideoPage,
      isEnteringOrLeavingSettings,
    ]
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

  if (isNoLayoutPage) {
    return <>{children}</>;
  }

  return (
    <Box sx={styles.layoutContainer}>
      <Backdrop
        open={isOverlayOpen}
        onClick={handleCloseAll}
        sx={styles.backdrop}
      />

      {!isVideoPage && !isSettingsPage && (
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
            <LayoutOverlayContent
              activeView={activeView}
              overlayScrollRef={overlayScrollRef}
              onClose={handleCloseAll}
            />
          </Box>
        </Box>
      </Slide>

      <Box component="main" sx={styles.mainContent}>
        {children}
      </Box>

      {!isPageWithoutBottomBar && (
        <BottomBar
          username={session?.username}
          profession={session?.profession}
        />
      )}
    </Box>
  );
}

const getStyles = (
  theme: Theme,
  layoutState: {
    isOverlayOpen: boolean;
    visualDrawerCollapsed: boolean;
    navWidth: number;
    isVideoPage: boolean;
    animateWidth: boolean;
  }
) => {
  const {
    isOverlayOpen,
    visualDrawerCollapsed,
    navWidth,
    isVideoPage,
    animateWidth,
  } = layoutState;

  return {
    layoutContainer: {
      display: "flex",
      flexDirection: { xs: "column", lg: "row" },
      height: "100dvh",
      width: "100vw",
      overflow: "hidden",
      backgroundColor: {
        xs: isVideoPage ? "common.black" : "background.default",
        lg: "background.default",
      },
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
      bgcolor: "background.default",
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
      bgcolor: "background.default",
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
      transition: animateWidth ? "width 220ms ease" : "none",
      overflowY: "auto",
      height: { xs: "auto", lg: "100%" },
      flex: { xs: "1 1 auto", lg: "none" },
      bgcolor: {
        xs: isVideoPage ? "common.black" : "background.default",
        lg: "background.default",
      },

      WebkitOverflowScrolling: "touch",
      overscrollBehaviorY: "contain",
    },
  };
};
