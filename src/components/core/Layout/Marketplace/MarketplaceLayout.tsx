"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Drawer } from "@mui/material";
import MarketplaceDrawer from "./MarketplaceDrawer";
import MarketplaceBottomBar from "./MarketplaceBottomBar";

const DRAWER_WIDTH = 300;

interface MarketplaceLayoutProps {
  children: React.ReactNode;
}

export default function MarketplaceLayout({
  children,
}: MarketplaceLayoutProps) {
  const styles = React.useMemo(
    () => ({
      main: {
        p: 2.5,
        ml: { sm: `${DRAWER_WIDTH}px` },
      },
      box: {
        display: "flex",
        minHeight: "100vh",
      },
    }),
    [DRAWER_WIDTH]
  );

  return (
    <Box sx={styles.box}>
      <CssBaseline />
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
          slotProps={{
            paper: {
              sx: {
                boxSizing: "border-box",
                width: DRAWER_WIDTH,
                transition: "width 200ms ease",
              },
            },
          }}
        >
          <MarketplaceDrawer />
        </Drawer>
      </Box>
      <Box component="main" sx={{ ...styles.main, pb: { xs: 8, sm: 2.5 } }}>
        {children}
      </Box>
      <MarketplaceBottomBar />
    </Box>
  );
}
