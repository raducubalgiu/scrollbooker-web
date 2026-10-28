"use client";

import React from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Container,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TopBar from "@/components/core/TopBar/TopBar";
import SettingsUserMenu from "./SettingsUserMenu";
import { AppRoutes } from "@/utils/routes";
import {
  getActiveSettingsHref,
  getSettingsPageTitle,
  SETTINGS_NAV_SECTIONS,
} from "./settingsNavigation";

type SettingsLayoutProps = {
  children: React.ReactNode;
};

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const pathname = usePathname() || "";
  const activeHref = getActiveSettingsHref(pathname);
  const pageTitle = getSettingsPageTitle(pathname);
  return (
    <Box sx={styles.container}>
      <Box sx={styles.topBar}>
        <TopBar
          logoHref={AppRoutes.feed()}
          rightContent={<SettingsUserMenu />}
        />
      </Box>

      <Box sx={styles.body}>
        <Container maxWidth="xl" disableGutters sx={styles.group}>
          <IconButton
            component={NextLink}
            href={AppRoutes.feed()}
            aria-label="Înapoi în aplicație"
            size="large"
            sx={styles.backButton}
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>

          <Box sx={styles.paper}>
            <Box component="aside" sx={styles.sidebar}>
              <Typography variant="h3" sx={styles.sidebarTitle}>
                Setări
              </Typography>

              <Box component="nav" sx={styles.sections}>
                {SETTINGS_NAV_SECTIONS.map((section) => (
                  <Box key={section.title} sx={styles.section}>
                    <Typography sx={styles.sectionTitle}>
                      {section.title}
                    </Typography>
                    <List disablePadding>
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.href === activeHref;

                        return (
                          <ListItemButton
                            key={item.href}
                            component={NextLink}
                            href={item.href}
                            selected={isActive}
                            sx={styles.navItem}
                          >
                            <ListItemIcon sx={styles.navIcon}>
                              <Icon color={isActive ? "primary" : "inherit"} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item.title}
                              slotProps={{
                                primary: {
                                  fontSize: "1.05rem",
                                  fontWeight: isActive ? 600 : 500,
                                  color: isActive
                                    ? "text.primary"
                                    : "text.secondary",
                                },
                              }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box component="section" sx={styles.content}>
              <Typography variant="h3" sx={styles.pageTitle}>
                {pageTitle}
              </Typography>
              {children}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SettingsLayout;

const pageBackground = (theme: Theme) =>
  theme.palette.mode === "dark"
    ? theme.palette.background.default
    : theme.palette.background.paper;

const surfaceBackground = (theme: Theme) =>
  theme.palette.mode === "dark"
    ? theme.palette.background.paper
    : theme.palette.background.default;

const styles = {
  container: (theme: Theme) => ({
    display: "block",
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      flexDirection: "column",
      bgcolor: pageBackground(theme),
    },
  }),
  topBar: {
    display: { xs: "none", lg: "block" },
    borderBottom: "1px solid",
    borderColor: "divider",
    bgcolor: "background.default",
  },
  body: {
    flex: 1,
    minHeight: 0,
    display: { xs: "block", lg: "flex" },
    justifyContent: "center",
    px: { xs: 0, lg: 4 },
    py: { xs: 0, lg: 3 },
  },
  group: {
    display: { xs: "block", lg: "flex" },
    alignItems: "flex-start",
    gap: 2,
    height: { xs: "auto", lg: "100%" },
  },
  backButton: {
    display: { xs: "none", lg: "inline-flex" },
    flexShrink: 0,
    m: 2.5,
    bgcolor: surfaceBackground,
    "&:hover": { bgcolor: surfaceBackground, opacity: 0.85 },
  },
  paper: {
    display: { xs: "block", lg: "flex" },
    gap: 1.5,
    flex: 1,
    minWidth: 0,
    height: { xs: "auto", lg: "100%" },
  },
  sidebar: {
    display: { xs: "none", lg: "flex" },
    flexDirection: "column",
    width: 400,
    flexShrink: 0,
    overflowY: "auto",
    bgcolor: surfaceBackground,
    borderRadius: 4,
    p: 2,
  },
  sidebarTitle: {
    fontWeight: 800,
    letterSpacing: "-0.01em",
    px: 1.5,
    pt: 1,
    mb: 1,
  },
  sections: {
    flex: 1,
  },
  section: {
    mt: 2,
  },
  sectionTitle: {
    px: 1.5,
    mb: 0.5,
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: "text.secondary",
  },
  navItem: {
    borderRadius: 2,
    py: 1.25,
    px: 1.5,
    mb: 0.25,
  },
  navIcon: {
    minWidth: 42,
    color: "text.secondary",
  },
  content: (theme: Theme) => ({
    flex: 1,
    minWidth: 0,
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
    [theme.breakpoints.up("lg")]: {
      overflowY: "auto",
      borderRadius: 4,
      px: 5,
      py: 4,
      bgcolor: surfaceBackground(theme),
    },
  }),
  pageTitle: {
    display: { xs: "none", lg: "block" },
    fontWeight: 800,
    letterSpacing: "-0.01em",
    mb: 2.5,
  },
};
