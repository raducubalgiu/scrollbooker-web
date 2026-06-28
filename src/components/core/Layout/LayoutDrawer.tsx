"use client";

import React, { useCallback, useEffect, useRef } from "react";
import {
  alpha,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import DrawerPopper from "./DrawerPopper";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import { AppRoutes, AppRouteValues } from "@/utils/routes";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import {
  DRAWER_PADDING_X,
  ICON_SLOT_SIZE,
  BOTTOM_BAR_HEIGHT,
} from "./Drawer.constants";

type ActiveView = "search" | "notifications" | "appointments" | null;

type LayoutDrawerProps = {
  session: Session | null;
  isSessionLoading: boolean;
  isAuthenticated: boolean;
  isCollapsed: boolean;
  activeView: ActiveView;
  onOpenSearchView: () => void;
  onOpenNotificationsView: () => void;
  onOpenAppointmentsView: () => void;
  onToggleDrawer: () => void;
};

const LayoutDrawer = ({
  session,
  isSessionLoading,
  isAuthenticated,
  isCollapsed,
  activeView,
  onOpenSearchView,
  onOpenNotificationsView,
  onOpenAppointmentsView,
  onToggleDrawer,
}: LayoutDrawerProps) => {
  const pathname = usePathname() || "/";
  const { navigateTo } = useAppNavigation();

  // Ref to avoid including pathname in navigate's dependency array
  const pathnameRef = useRef(pathname);
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const [moreOpen, setMoreOpen] = React.useState(false);
  const [moreAnchorEl, setMoreAnchorEl] = React.useState<HTMLElement | null>(
    null
  );

  const navigate = useCallback(
    (route: AppRouteValues, e?: React.MouseEvent<HTMLElement>) => {
      if (route === AppRoutes.more()) {
        const el = (e?.currentTarget as HTMLElement) ?? moreAnchorEl;
        setMoreAnchorEl(el ?? null);
        setMoreOpen((v) => !v);
        return;
      }

      if (moreOpen) {
        setMoreOpen(false);
      }

      const routePath = route.split("?")[0];
      if (pathnameRef.current !== routePath) {
        navigateTo(route);
      }
    },
    [moreAnchorEl, moreOpen, navigateTo]
  );

  const handleCloseMorePopper = useCallback(() => {
    setMoreOpen(false);
  }, []);

  const isSelected = useCallback(
    (route: AppRouteValues) => {
      const routePath = route.split("?")[0];

      if (routePath === "/") {
        return pathname === "/";
      }

      return pathname === routePath || pathname.startsWith(routePath + "/");
    },
    [pathname]
  );

  return (
    <Box sx={styles.root}>
      <Box sx={styles.scrollArea}>
        {isSessionLoading ? (
          <Box sx={styles.loadingWrapper}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width="100%"
                height={50}
                sx={{ mb: 2, borderRadius: 2 }}
              />
            ))}
          </Box>
        ) : (
          <>
            <Box
              sx={[
                styles.brandRow,
                isCollapsed
                  ? styles.brandRowCollapsed
                  : styles.brandRowExpanded,
              ]}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                fontWeight={700}
                sx={[
                  styles.brandText,
                  isCollapsed
                    ? styles.brandTextCollapsed
                    : styles.brandTextExpanded,
                ]}
              >
                {isCollapsed ? "S" : "ScrollBooker"}
              </Typography>
            </Box>

            <Box
              sx={[
                styles.searchRow,
                isCollapsed
                  ? styles.searchRowCollapsed
                  : styles.searchRowExpanded,
              ]}
            >
              {isCollapsed ? (
                <IconButton
                  onClick={onOpenSearchView}
                  sx={[
                    styles.searchIconButton,
                    activeView === "search" && styles.searchIconButtonActive,
                  ]}
                >
                  <SearchIcon
                    sx={[
                      styles.searchCollapsedIcon,
                      activeView === "search" &&
                        styles.searchCollapsedIconActive,
                    ]}
                  />
                </IconButton>
              ) : (
                <TextField
                  autoFocus={false}
                  placeholder="Caută"
                  variant="outlined"
                  fullWidth
                  onFocus={onOpenSearchView}
                  sx={styles.search}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={styles.searchFieldIcon} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            </Box>

            <Box sx={styles.routesWrapper}>
              <PublicRoutes
                session={session}
                isSelected={isSelected}
                isCollapsed={isCollapsed}
                activeView={activeView}
                onNavigate={navigate}
                onOpenSearchView={onOpenSearchView}
                onOpenNotificationsView={onOpenNotificationsView}
                onOpenAppointmentsView={onOpenAppointmentsView}
              />

              <DrawerPopper
                moreOpen={moreOpen}
                moreAnchorEl={moreAnchorEl}
                onCloseMore={handleCloseMorePopper}
              />

              {isAuthenticated && (
                <AdminRoutes
                  session={session}
                  isSelected={isSelected}
                  onNavigate={navigate}
                  isCollapsed={isCollapsed}
                />
              )}

              {!isAuthenticated && !isCollapsed && (
                <Box m={2.5}>
                  <Button
                    variant="contained"
                    disableElevation
                    fullWidth
                    sx={{ p: 1.5 }}
                    onClick={() => navigateTo(AppRoutes.login())}
                  >
                    Conectare
                  </Button>
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>

      <Box
        sx={{
          ...styles.bottomBar,
          justifyContent: isCollapsed ? "center" : "flex-end",
        }}
      >
        <IconButton sx={styles.bottomBarButton} onClick={onToggleDrawer}>
          {isCollapsed ? (
            <ChevronRightRoundedIcon sx={styles.bottomBarIcon} />
          ) : (
            <ChevronLeftRoundedIcon sx={styles.bottomBarIcon} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default LayoutDrawer;

const styles = {
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },

  scrollArea: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    overflowX: "hidden",
    pt: 2.5,
    pb: 2,
    "&::-webkit-scrollbar": {
      width: 6,
    },
    "&::-webkit-scrollbar-thumb": {
      bgcolor: "divider",
      borderRadius: 999,
    },
  },

  loadingWrapper: {
    px: 2.5,
  },

  brandRow: {
    minHeight: 56,
    mb: 2,
  },

  brandRowExpanded: {
    px: `${DRAWER_PADDING_X}px`,
    display: "flex",
    alignItems: "center",
  },

  brandRowCollapsed: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  brandText: {
    lineHeight: 1.1,
  },

  brandTextExpanded: {
    fontSize: 30,
    textAlign: "left",
  },

  brandTextCollapsed: {
    width: ICON_SLOT_SIZE,
    textAlign: "center",
    fontSize: 30,
  },

  searchRow: {
    mb: 1.5,
  },

  searchRowExpanded: {
    px: `${DRAWER_PADDING_X}px`,
  },

  searchRowCollapsed: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  routesWrapper: {
    mt: 0.5,
  },

  searchIconButton: {
    width: ICON_SLOT_SIZE,
    height: 56,
    borderRadius: 2,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: (theme: Theme) => alpha(theme.palette.action.hover, 0.05),
    border: "1px solid",
    borderColor: "divider",
    boxSizing: "border-box",
    "&:hover": {
      bgcolor: (theme: Theme) => alpha(theme.palette.action.hover, 0.1),
      borderColor: "action.disabled",
    },
  },

  searchIconButtonActive: {
    bgcolor: "action.hover",
    borderColor: "primary.main",
    "&:hover": {
      bgcolor: "action.hover",
      borderColor: "primary.main",
    },
  },

  searchCollapsedIcon: {
    color: "text.secondary",
    fontSize: 28,
  },

  searchCollapsedIconActive: {
    color: "primary.main",
  },

  searchFieldIcon: {
    color: "text.secondary",
    ml: 0.5,
    fontSize: 24,
  },

  search: {
    "& .MuiOutlinedInput-root": {
      minHeight: 56,
      borderRadius: "999px",
      bgcolor: (theme: Theme) => alpha(theme.palette.action.hover, 0.05),
      "& fieldset": {
        borderColor: "divider",
      },
      "&:hover fieldset": {
        borderColor: "action.disabled",
      },
      "&.Mui-focused": {
        bgcolor: "background.paper",
      },
      "& input": {
        fontSize: 18,
        py: 1.6,
      },
      "& input::placeholder": {
        fontSize: 18,
        opacity: 0.8,
        color: (theme: Theme) => alpha(theme.palette.text.disabled, 0.5),
      },
    },
  },

  bottomBar: {
    height: `${BOTTOM_BAR_HEIGHT}px`,
    minHeight: `${BOTTOM_BAR_HEIGHT}px`,
    borderTop: "1px solid",
    borderColor: "divider",
    display: "flex",
    alignItems: "center",
    px: 2,
    flexShrink: 0,
  },

  bottomBarButton: {
    width: 44,
    height: 44,
    borderRadius: 2,
    color: "text.secondary",
    bgcolor: "action.hover",
    "&:hover": {
      bgcolor: "action.hover",
      color: "text.primary",
    },
  },

  bottomBarIcon: {
    fontSize: 24,
  },
};
