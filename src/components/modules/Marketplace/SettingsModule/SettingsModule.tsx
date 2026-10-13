"use client";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import React from "react";
import NextLink from "next/link";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import { signOut } from "next-auth/react";
import { AppRoutes } from "@/utils/routes";

const SettingsModule = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <HeaderMobile title="Setări" />

      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton component={NextLink} href={AppRoutes.account()}>
          <ListItemIcon>
            <AdminPanelSettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Cont" />
        </ListItemButton>

        <Divider />

        <ListItemButton component={NextLink} href={AppRoutes.display()}>
          <ListItemIcon>
            <BedtimeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Afișare" />
        </ListItemButton>

        <Divider />

        <ListItemButton>
          <ListItemIcon>
            <FlagOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Raportează o problema" />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={() => signOut()}>
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Delogare" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default SettingsModule;
