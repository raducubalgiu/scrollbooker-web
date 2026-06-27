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
import { AppRoutes } from "@/utils/routes";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import Protected from "@/components/cutomized/Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

type ProfileMenuSheetProps = {
  isMenuOpen: boolean;
  onCloseMenu: () => void;
};

const ProfileMenuSheet = ({
  isMenuOpen,
  onCloseMenu,
}: ProfileMenuSheetProps) => {
  const { navigateTo } = useAppNavigation();

  return (
    <Drawer
      anchor="bottom"
      open={isMenuOpen}
      onClose={onCloseMenu}
      sx={{ display: { xs: "block", lg: "none" } }}
      slotProps={{
        paper: { sx: styles.drawer },
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
          <Protected permission={PermissionEnum.CREATE_POST}>
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
          </Protected>

          <Protected permission={PermissionEnum.MY_BUSINESS_ROUTES_VIEW}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigateTo(AppRoutes.myBusiness())}
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
          </Protected>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigateTo(AppRoutes.settings())}
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

const styles = {
  drawer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "background.paper",
    py: 1.5,
  },
};
