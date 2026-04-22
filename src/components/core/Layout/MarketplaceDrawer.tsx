"use client";

import React, { useCallback } from "react";
import {
  alpha,
  Box,
  Button,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
  Theme,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DrawerPopper from "./DrawerPopper";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";

type MarketplaceDrawerProps = {
  isCollapsed: boolean;
  onOpenSearchView: () => void;
  onOpenNotificationsView: () => void;
};

const DRAWER_PADDING_X = 20;
const ICON_SLOT_SIZE = 72;
const ITEM_GAP = 10;
const CONTENT_START = DRAWER_PADDING_X + ICON_SLOT_SIZE + ITEM_GAP;

const MarketplaceDrawer = ({
  isCollapsed,
  onOpenSearchView,
  onOpenNotificationsView,
}: MarketplaceDrawerProps) => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  const pathname = usePathname() || "/";
  const router = useRouter();

  const [moreOpen, setMoreOpen] = React.useState(false);
  const [moreAnchorEl, setMoreAnchorEl] = React.useState<HTMLElement | null>(
    null
  );

  const navigate = React.useCallback(
    (route: string, e?: React.MouseEvent<HTMLElement>) => {
      if (route === "/more") {
        const el = (e?.currentTarget as HTMLElement) ?? moreAnchorEl;
        setMoreAnchorEl(el ?? null);
        setMoreOpen((v) => !v);
        return;
      }

      if (moreOpen) {
        setMoreOpen(false);
      }

      if (pathname !== route) {
        router.push(route);
      }
    },
    [moreAnchorEl, moreOpen, pathname, router]
  );

  const handleCloseMorePopper = useCallback(() => {
    setMoreOpen(false);
  }, []);

  const isSelected = useCallback(
    (route: string) => pathname === route || pathname.startsWith(route + "/"),
    [pathname]
  );

  return (
    <Box sx={styles.root}>
      <Box
        sx={[
          styles.brandRow,
          isCollapsed ? styles.brandRowCollapsed : styles.brandRowExpanded,
        ]}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          fontWeight={700}
          sx={[
            styles.brandText,
            isCollapsed ? styles.brandTextCollapsed : styles.brandTextExpanded,
          ]}
        >
          {isCollapsed ? "S" : "ScrollBooker"}
        </Typography>
      </Box>

      <Box
        sx={[
          styles.searchRow,
          isCollapsed ? styles.searchRowCollapsed : styles.searchRowExpanded,
        ]}
      >
        {isCollapsed ? (
          <IconButton onClick={onOpenSearchView} sx={styles.searchIconButton}>
            <SearchIcon sx={styles.searchCollapsedIcon} />
          </IconButton>
        ) : (
          <TextField
            autoFocus={false}
            placeholder="Caută utilizatori"
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
          onNavigate={navigate}
          onOpenNotificationsView={onOpenNotificationsView}
        />

        <DrawerPopper
          moreOpen={moreOpen}
          moreAnchorEl={moreAnchorEl}
          onCloseMore={handleCloseMorePopper}
        />

        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="100%"
              height={56}
              sx={{ mt: 1.25, borderRadius: 2 }}
            />
          ))}

        {isAuthenticated && (
          <AdminRoutes
            hasEmployees={session?.has_employees ?? false}
            isSelected={isSelected}
            onNavigate={navigate}
            isCollapsed={isCollapsed}
          />
        )}

        {!isAuthenticated && !isLoading && !isCollapsed && (
          <Button
            variant="outlined"
            disableElevation
            sx={{
              mt: 2.5,
              ml: `${CONTENT_START}px`,
              mr: `${DRAWER_PADDING_X}px`,
            }}
            onClick={() => router.push("/api/auth/signin")}
          >
            Conectare
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MarketplaceDrawer;

const styles = {
  root: {
    pt: 2.5,
    pb: 2,
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

  searchCollapsedIcon: {
    color: "text.secondary",
    fontSize: 28,
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
};
