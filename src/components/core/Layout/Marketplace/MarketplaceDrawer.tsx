"use client";

import React, { useCallback } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CButton from "../../CButton/CButton";
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
          <CButton
            onClick={() => router.push("/api/auth/signin")}
            label="Conectare"
            variant="outlined"
            sx={{ mt: 2.5 }}
          />
        )}
      </Box>
    </Box>
  );
};

export default MarketplaceDrawer;
