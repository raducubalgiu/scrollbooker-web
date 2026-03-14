import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Tooltip,
  Menu,
  Typography,
  Divider,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CustomStack from "../CustomStack/CustomStack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import LayoutSearch from "./LayoutSearch";
import LayoutNotificationsMenu from "./LayoutNotificationsMenu";
import { useThemeMode } from "@/providers/ThemeContext";
import { ThemeModeEnum } from "@/providers/ThemeModeEnum";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

type LayoutAppBarProps = {
  onDrawerToggle: () => void;
  drawerWidth: number;
};

export default function LayoutAppBar({
  onDrawerToggle,
  drawerWidth,
}: LayoutAppBarProps) {
  const { mode, setMode } = useThemeMode();

  const styles = {
    appBar: {
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` },
    },
  };

  const [themeMenuAnchorEl, setThemeMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isThemeMenuOpen = Boolean(themeMenuAnchorEl);

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setThemeMenuAnchorEl(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchorEl(null);
  };

  const handleThemeSelect = (themeMode: ThemeModeEnum) => {
    setMode(themeMode);
    handleThemeMenuClose();
  };

  const getThemeIcon = () => {
    if (mode === ThemeModeEnum.SYSTEM) return <SettingsBrightnessIcon />;
    return mode === ThemeModeEnum.LIGHT ? <LightModeIcon /> : <DarkModeIcon />;
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
            <Tooltip title="Tema aplicatiei">
              <IconButton
                onClick={handleThemeMenuOpen}
                sx={{
                  mr: 1.5,
                  borderRadius: 3,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  backgroundColor: isThemeMenuOpen
                    ? "action.selected"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                {getThemeIcon()}
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={themeMenuAnchorEl}
              open={isThemeMenuOpen}
              onClose={handleThemeMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    minWidth: 300,
                    borderRadius: 5,
                  },
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.25 }}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ fontWeight: 700 }}
                >
                  Tema aplicatiei
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ py: 1 }}>
                <MenuItem
                  selected={mode === ThemeModeEnum.SYSTEM}
                  onClick={() => handleThemeSelect(ThemeModeEnum.SYSTEM)}
                >
                  <ListItemIcon>
                    <SettingsBrightnessIcon />
                  </ListItemIcon>
                  <ListItemText>SYSTEM</ListItemText>
                </MenuItem>
                <MenuItem
                  selected={mode === ThemeModeEnum.LIGHT}
                  onClick={() => handleThemeSelect(ThemeModeEnum.LIGHT)}
                >
                  <ListItemIcon>
                    <LightModeIcon />
                  </ListItemIcon>
                  <ListItemText>LIGHT</ListItemText>
                </MenuItem>
                <MenuItem
                  selected={mode === ThemeModeEnum.DARK}
                  onClick={() => handleThemeSelect(ThemeModeEnum.DARK)}
                >
                  <ListItemIcon>
                    <DarkModeIcon />
                  </ListItemIcon>
                  <ListItemText>DARK</ListItemText>
                </MenuItem>
              </Box>
            </Menu>
          </CustomStack>
        </CustomStack>
      </Toolbar>
    </AppBar>
  );
}
