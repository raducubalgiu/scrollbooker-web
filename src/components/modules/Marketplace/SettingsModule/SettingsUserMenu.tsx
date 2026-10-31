"use client";

import React, { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { logout } from "@/controllers/auth/auth.controller";
import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  Divider,
  Grow,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppRoutes } from "@/utils/routes";

const CLOSE_DELAY_MS = 150;

const SettingsUserMenu = () => {
  const { data: session } = useSession();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  if (!session?.username) return null;

  const profileHref = session.profession
    ? AppRoutes.profile(session.username, session.profession)
    : AppRoutes.feed();

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleOpen = () => {
    cancelClose();
    setOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(
      () => setOpen(false),
      CLOSE_DELAY_MS,
    );
  };

  const handleClose = () => {
    cancelClose();
    setOpen(false);
  };

  return (
    <Box onMouseEnter={handleOpen} onMouseLeave={scheduleClose}>
      <ButtonBase
        ref={anchorRef}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Meniul contului"
        aria-haspopup="menu"
        aria-expanded={open}
        sx={styles.avatarButton}
      >
        <Avatar
          src={session.avatar ?? ""}
          alt={session.username}
          sx={styles.avatar}
        />
      </ButtonBase>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        sx={styles.popper}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: "top right" }}>
            <Paper
              elevation={8}
              onMouseEnter={handleOpen}
              onMouseLeave={scheduleClose}
              sx={styles.paper}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={false} dense={false}>
                  <MenuItem
                    component={NextLink}
                    href={profileHref}
                    onClick={handleClose}
                    sx={styles.menuItem}
                  >
                    <ListItemIcon>
                      <PersonOutlineRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Vezi profilul" />
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={() => logout()} sx={styles.menuItem}>
                    <ListItemIcon>
                      <LogoutIcon color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Delogare"
                      slotProps={{ primary: { color: "error.main" } }}
                    />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default SettingsUserMenu;

const styles = {
  avatarButton: {
    borderRadius: "50%",
  },
  avatar: {
    width: 40,
    height: 40,
  },
  popper: {
    zIndex: 1400,
    pt: 1,
  },
  paper: {
    minWidth: 220,
    borderRadius: 3,
  },
  menuItem: {
    py: 1.25,
  },
};
