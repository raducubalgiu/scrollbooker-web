"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  useMediaQuery,
  useTheme,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import NextLink from "next/link";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import { AppRoutes } from "@/utils/routes";
import { signOut } from "next-auth/react";

const SettingsModule = () => {
  const theme = useTheme();
  const router = useRouter();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    if (isDesktop) router.replace(AppRoutes.accountInfo());
  }, [isDesktop, router]);

  return (
    <Box
      sx={{
        display: { xs: "flex", lg: "none" },
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <HeaderMobile title="Setări" />

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        sx={{
          p: 0,
          overflow: "hidden",
        }}
      >
        <ListItemButton
          component={NextLink}
          href={AppRoutes.account()}
          sx={styles.listItem}
        >
          <ListItemIcon sx={styles.listIcon}>
            <AdminPanelSettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Cont"
            slotProps={{ primary: { fontWeight: 500 } }}
          />
          <ChevronRightIcon sx={styles.arrowIcon} />
        </ListItemButton>

        <Divider />

        <ListItemButton
          component={NextLink}
          href={AppRoutes.display()}
          sx={styles.listItem}
        >
          <ListItemIcon sx={styles.listIcon}>
            <BedtimeOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Afișare"
            slotProps={{ primary: { fontWeight: 500 } }}
          />
          <ChevronRightIcon sx={styles.arrowIcon} />
        </ListItemButton>

        <Divider />

        <ListItemButton
          component={NextLink}
          href={AppRoutes.reportProblem()}
          sx={styles.listItem}
        >
          <ListItemIcon sx={styles.listIcon}>
            <FlagOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Raportează o problemă"
            slotProps={{ primary: { fontWeight: 500 } }}
          />
          <ChevronRightIcon sx={styles.arrowIcon} />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={() => signOut()} sx={styles.logoutItem}>
          <ListItemIcon sx={styles.listIcon}>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText
            primary="Delogare"
            slotProps={{
              primary: {
                fontWeight: 600,
                color: "error.main",
              },
            }}
          />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default SettingsModule;

const styles = {
  listItem: {
    py: 1.8,
    px: 2.5,
    transition: "all 0.2s ease",
    "&:hover": {
      bgcolor: "action.hover",
    },
  },
  logoutItem: {
    py: 1.8,
    px: 2.5,
    transition: "all 0.2s ease",
    "&:hover": {
      bgcolor: "error.lighter",
    },
  },
  listIcon: {
    minWidth: 40,
    color: "text.secondary",
  },
  arrowIcon: {
    color: "text.disabled",
    fontSize: "1.25rem",
  },
};
