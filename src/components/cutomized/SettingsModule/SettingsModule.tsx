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
import React from "react";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import { signOut } from "next-auth/react";

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
        <ListItemButton>
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
