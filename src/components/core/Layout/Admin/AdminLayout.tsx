"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AdminDrawer from "./AdminDrawer";
import LayoutAppBar from "./AdminAppBar";
import { useBreakpoints } from "@/hooks/useBreakpoints";

const DRAWER_DESKTOP_WIDTH = 350;
const DRAWER_PHONE_WIDTH = 300;

interface LayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  const { isPhone } = useBreakpoints();
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const COLLAPSED_WIDTH = 80;
  const DRAWER_WIDTH = React.useMemo(() => {
    return isPhone
      ? DRAWER_PHONE_WIDTH
      : collapsed
        ? COLLAPSED_WIDTH
        : DRAWER_DESKTOP_WIDTH;
  }, [isPhone, collapsed]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const styles = React.useMemo(
    () => ({
      main: {
        p: 2.5,
        width: "100%",
      },
      box: {
        display: "flex",
        minHeight: "100vh",
      },
    }),
    []
  );

  return (
    <Box sx={styles.box}>
      <CssBaseline />
      <LayoutAppBar
        onDrawerToggle={handleDrawerToggle}
        drawerWidth={DRAWER_WIDTH}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />
      <AdminDrawer
        mobileOpen={mobileOpen}
        onCloseDrawer={handleDrawerClose}
        onTransitionDrawerEnd={handleDrawerTransitionEnd}
        drawerWidth={DRAWER_WIDTH}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />
      <Box component="main" sx={styles.main}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
