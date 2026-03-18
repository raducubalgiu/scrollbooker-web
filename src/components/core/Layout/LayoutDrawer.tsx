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
  const desktopSx = {
    display: { xs: "none", sm: "block" },
  };

  const mobilePaperSx = {
    borderRadius: 0,
    backgroundImage: "none",
    width: drawerWidth,
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
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", sm: "none" } }}
        slotProps={{ paper: { sx: mobilePaperSx } }}
      >
        <Sidebar collapsed={false} onToggleCollapse={onToggleCollapse} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={desktopSx}
        open
        slotProps={{
          paper: {
            sx: {
              boxSizing: "border-box",
              width: drawerWidth,
              transition: "width 200ms ease",
            },
          },
        }}
      >
        <Sidebar collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
      </Drawer>
    </Box>
  );
}
