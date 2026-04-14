import React from "react";
import { AppBar, Toolbar, Box, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LayoutSearch from "./LayoutSearch";
import LayoutNotificationsMenu from "./LayoutNotificationsMenu";
import LayoutThemeToggle from "./LayoutThemeToggle";

type AdminAppBarProps = {
  onDrawerToggle: () => void;
  drawerWidth: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export default function AdminAppBar({
  onDrawerToggle,
  drawerWidth,
  collapsed,
  onToggleCollapse,
}: AdminAppBarProps) {
  const styles = {
    appBar: {
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` },
    },
  };

  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Toolbar>
        <Stack sx={{ width: "100%", flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="default"
              edge="start"
              onClick={onDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            {onToggleCollapse && (
              <IconButton
                color="default"
                edge="start"
                onClick={onToggleCollapse}
                sx={{ mr: 2, display: { xs: "none", sm: "inline-flex" } }}
              >
                {collapsed ? <MenuIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Box>
          <LayoutSearch />
          <Stack>
            <LayoutNotificationsMenu />
            <LayoutThemeToggle />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
