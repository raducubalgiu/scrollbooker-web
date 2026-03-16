import React from "react";
import { Box, Drawer } from "@mui/material";
import Sidebar from "./Sidebar";

type LayoutDrawerProps = {
  mobileOpen: boolean;
  onCloseDrawer: () => void;
  onTransitionDrawerEnd: () => void;
  drawerWidth: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export default function LayoutDrawer({
  mobileOpen,
  onCloseDrawer,
  onTransitionDrawerEnd,
  drawerWidth,
  collapsed,
  onToggleCollapse,
}: LayoutDrawerProps) {
  const styles = {
    drawerDesktop: {
      display: { xs: "none", sm: "block" },
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: drawerWidth,
        transition: "width 200ms ease",
      },
    },
    drawerMobile: {
      root: { keepMounted: true },
      paper: {
        sx: {
          borderRadius: 0,
          backgroundImage: "none",
        },
      },
      display: { xs: "block", sm: "none" },
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: drawerWidth,
      },
    },
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={onTransitionDrawerEnd}
        onClose={onCloseDrawer}
        sx={styles.drawerMobile}
      >
        <Sidebar />
      </Drawer>
      <Drawer variant="permanent" sx={styles.drawerDesktop} open>
        <Sidebar collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
      </Drawer>
    </Box>
  );
}
