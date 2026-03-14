import React from "react";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import CustomStack from "../CustomStack/CustomStack";
import MenuIcon from "@mui/icons-material/Menu";
import LayoutSearch from "./LayoutSearch";
import LayoutNotificationsMenu from "./LayoutNotificationsMenu";
import LayoutThemeToggle from "./LayoutThemeToggle";

type LayoutAppBarProps = {
  onDrawerToggle: () => void;
  drawerWidth: number;
};

export default function LayoutAppBar({
  onDrawerToggle,
  drawerWidth,
}: LayoutAppBarProps) {
  const styles = {
    appBar: {
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` },
    },
  };

  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Toolbar>
        <CustomStack sx={{ width: "100%", flex: 1 }}>
          <Box>
            <IconButton
              color="default"
              edge="start"
              onClick={onDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <LayoutSearch />
          <CustomStack>
            <LayoutNotificationsMenu />
            <LayoutThemeToggle />
          </CustomStack>
        </CustomStack>
      </Toolbar>
    </AppBar>
  );
}
