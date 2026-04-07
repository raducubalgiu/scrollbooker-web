"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Drawer } from "@mui/material";
import MarketplaceDrawer from "./MarketplaceDrawer";
import MarketplaceBottomBar from "./MarketplaceBottomBar";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";

const DRAWER_WIDTH = 300;

interface MarketplaceLayoutProps {
  children: React.ReactNode;
}

export default function MarketplaceLayout({
  children,
}: MarketplaceLayoutProps) {
  const pathname = usePathname() || "";

  const isBusinessPage = React.useMemo(
    () => pathname.startsWith("/business/"),
    [pathname]
  );

  const isAdminPage = React.useMemo(
    () => pathname.startsWith("/admin/"),
    [pathname]
  );

  const isProfileVideoPage = React.useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    return (
      segments.length === 4 &&
      segments[0] === "profile" &&
      segments[2] === "video"
    );
  }, [pathname]);

  const isPostPage = React.useMemo(
    () => pathname.startsWith("/post/"),
    [pathname]
  );

  const shouldShowDrawer =
    !isBusinessPage && !isProfileVideoPage && !isPostPage;

  const theme = useTheme();
  const bgColor =
    theme.palette.mode === "dark" ? "background.default" : "background.paper";

  const styles = React.useMemo(
    () => ({
      main: {
        p: {
          xs: 0,
          md: isProfileVideoPage || isBusinessPage || isPostPage ? 0 : 2.5,
        },
        width: "100%",
        bgcolor: isAdminPage ? "background.default" : bgColor,
      },
      box: {
        display: "flex",
        minHeight: "100vh",
      },
      paper: {
        bgcolor: bgColor,
        boxSizing: "border-box",
        width: DRAWER_WIDTH,
        transition: "width 200ms ease",
        boxShadow: "none",
        borderRight: isAdminPage ? 1 : 0,
        borderColor: "divider",
      },
    }),
    [bgColor, isProfileVideoPage, isAdminPage, isBusinessPage]
  );

  return (
    <Box sx={styles.box}>
      <CssBaseline />
      {shouldShowDrawer && (
        <Box
          component="nav"
          sx={{
            width: { sm: DRAWER_WIDTH },
            flexShrink: { sm: 0 },
            display: { xs: "none", lg: "block" },
          }}
        >
          <Drawer
            variant="permanent"
            open
            slotProps={{ paper: { sx: styles.paper } }}
          >
            <MarketplaceDrawer />
          </Drawer>
        </Box>
      )}
      <Box component="main" sx={styles.main}>
        {children}
      </Box>
      <MarketplaceBottomBar />
    </Box>
  );
}
