import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CloseIcon from "@mui/icons-material/Close";

type ProfileMenuSheetProps = {
  isMenuOpen: boolean;
  onCloseMenu: () => void;
};

const ProfileMenuSheet = ({
  isMenuOpen,
  onCloseMenu,
}: ProfileMenuSheetProps) => {
  return (
    <Drawer
      anchor="bottom"
      open={isMenuOpen}
      onClose={onCloseMenu}
      sx={{ display: { xs: "block", lg: "none" } }}
      slotProps={{
        paper: {
          sx: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: "background.paper",
            pt: 1.5,
          },
        },
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          position="relative"
          mx={1.5}
          minHeight={35}
        >
          <Typography fontWeight={800}>Meniu principal</Typography>

          <IconButton
            onClick={onCloseMenu}
            size="small"
            sx={{
              position: "absolute",
              right: 0,
              color: "text.secondary",
            }}
          >
            <CloseIcon fontSize="medium" sx={{ color: "text.primary" }} />
          </IconButton>
        </Stack>

        <List sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {}}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "text.primary" }}>
                <VideocamOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Creează o postare"
                slotProps={{
                  primary: { fontWeight: 500 },
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {}}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "text.primary" }}>
                <BusinessCenterOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Afacerea mea"
                slotProps={{
                  primary: { fontWeight: 500 },
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {}}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "text.primary" }}>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Setări"
                slotProps={{
                  primary: { fontWeight: 500 },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default ProfileMenuSheet;
