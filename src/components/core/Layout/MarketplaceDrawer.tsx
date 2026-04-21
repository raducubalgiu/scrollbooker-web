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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import DrawerPopper from "./DrawerPopper";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";

export type ScrollBookerRoute = {
  label: string;
  route: string;
  icon: React.ReactNode;
  permission: PermissionEnum;
};

const MarketplaceDrawer = () => {
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

      if (moreOpen) setMoreOpen(false);

      if (pathname !== route) router.push(route);
    },
    [pathname, router, moreAnchorEl, moreOpen]
  );

  const handleCloseMorePopper = useCallback(() => {
    setMoreOpen(false);
  }, []);

  const isSelected = useCallback(
    (route: string) => pathname === route || pathname.startsWith(route + "/"),
    [pathname]
  );

  return (
    <Box sx={{ p: 2.5 }}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        fontWeight={600}
        fontSize={30}
        sx={{ mb: 2.5 }}
      >
        ScrollBooker
      </Typography>

      <Box>
        <TextField
          placeholder="Cauta utilizatori"
          variant="outlined"
          fullWidth
          sx={styles.search}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary", ml: 1 }} />
                </InputAdornment>
              ),
            },
          }}
        />
        <PublicRoutes
          session={session}
          isSelected={isSelected}
          onNavigate={navigate}
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
              height={50}
              sx={{ mt: 1.5 }}
            />
          ))}
        {isAuthenticated && (
          <AdminRoutes
            hasEmployees={session?.has_employees ?? false}
            isSelected={isSelected}
            onNavigate={navigate}
          />
        )}
        {!isAuthenticated && !isLoading && (
          <Button
            variant="outlined"
            disableElevation
            sx={{ mt: 2.5 }}
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
  search: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "999px",
      bgcolor: (theme: Theme) => alpha(theme.palette.action.hover, 0.05),
      transition: "all 0.2s ease-in-out",
      "& fieldset": {
        borderColor: "divider",
      },
      "&:hover fieldset": {
        borderColor: "action.disabled",
      },
      "&.Mui-focused": {
        bgcolor: "background.paper",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
      },
      "& input": {
        fontSize: "18px",
      },
      "& input::placeholder": {
        fontSize: "18px",
        opacity: 0.8,
        color: (theme: Theme) => alpha(theme.palette.text.disabled, 0.5),
      },
    },
    mb: 1.5,
  },
};
