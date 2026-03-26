"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Drawer } from "@mui/material";
import MarketplaceDrawer from "./MarketplaceDrawer";
import MarketplaceBottomBar from "./MarketplaceBottomBar";
import { useTheme } from "@mui/material/styles";

const DRAWER_WIDTH = 300;

interface MarketplaceLayoutProps {
  children: React.ReactNode;
}

export default function MarketplaceLayout({
  children,
}: MarketplaceLayoutProps) {
  const theme = useTheme();
  const bgColor =
    theme.palette.mode === "dark" ? "background.default" : "background.paper";

  const styles = React.useMemo(
    () => ({
      main: {
        p: {
          xs: 0,
          md: 2.5,
        },
        width: "100%",
        bgcolor: bgColor,
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
        border: 0,
      },
    }),
    [bgColor]
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
          slotProps={{ paper: { sx: styles.paper } }}
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
