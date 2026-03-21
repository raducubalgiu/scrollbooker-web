"use client";

import React from "react";
import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
  Popper,
  Paper,
  ClickAwayListener,
  List,
  ListItemText as MuiListItemText,
  Badge,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { usePathname, useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSession } from "next-auth/react";
import Protected from "@/components/cutomized/Protected/Protected";
import CButton from "../../CButton/CButton";
import { useThemeMode } from "@/providers/ThemeContext";
import { ThemeModeEnum } from "@/providers/ThemeModeEnum";

const MarketplaceDrawer = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const pathname = usePathname() || "/";
  const router = useRouter();

  const items = React.useMemo(
    () => [
      { label: "Caută", route: "/", icon: <SearchOutlinedIcon /> },
      {
        label: "Explorează",
        route: "/explore",
        icon: <VideoLibraryOutlinedIcon />,
      },
      {
        label: "Notificări",
        route: "/notifications",
        icon: (
          <Badge badgeContent={4} color="error">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        ),
      },
      {
        label: "Rezervări",
        route: "/appointments",
        icon: (
          <Badge badgeContent={2} color="error">
            <QueryBuilderOutlinedIcon />
          </Badge>
        ),
      },
      {
        label: "Profil",
        route: `/profile/${session?.username}`,
        icon: <PersonOutlineOutlinedIcon />,
      },
      { label: "Mai mult", route: "/more", icon: <MoreHorizOutlinedIcon /> },
    ],
    []
  );

  const [moreOpen, setMoreOpen] = React.useState(false);
  const [moreAnchorEl, setMoreAnchorEl] = React.useState<HTMLElement | null>(
    null
  );

  const [themeOpen, setThemeOpen] = React.useState(false);
  const [themeAnchorEl, setThemeAnchorEl] = React.useState<HTMLElement | null>(
    null
  );
  const themeCloseTimer = React.useRef<number | null>(null);

  const openThemePopper = (el: HTMLElement | null) => {
    if (themeCloseTimer.current) {
      window.clearTimeout(themeCloseTimer.current);
      themeCloseTimer.current = null;
    }
    setThemeAnchorEl(el);
    setThemeOpen(true);
  };

  const scheduleCloseThemePopper = (delay = 150) => {
    if (themeCloseTimer.current) window.clearTimeout(themeCloseTimer.current);
    themeCloseTimer.current = window.setTimeout(() => {
      setThemeOpen(false);
      themeCloseTimer.current = null;
    }, delay);
  };

  const navigate = React.useCallback(
    (route: string, e?: React.MouseEvent<HTMLElement>) => {
      if (route === "/more") {
        const el = (e?.currentTarget as HTMLElement) ?? moreAnchorEl;
        setMoreAnchorEl(el ?? null);
        setMoreOpen((v) => !v);
        return;
      }

      if (moreOpen) setMoreOpen(false);

      if (pathname !== route) router.push(route);
    },
    [pathname, router, moreAnchorEl, moreOpen]
  );

  const { mode, setMode } = useThemeMode();

  const styles = React.useMemo(
    () => ({
      button: {
        width: "100%",
        px: 1.5,
        py: 1.25,
        borderRadius: 2,
        justifyContent: "flex-start",
        gap: 1.25,
        transition: "background-color 150ms ease, transform 120ms ease",
        bgcolor: "transparent",
        "&.Mui-selected": {
          bgcolor: "transparent !important",
        },
        "&:hover, &.Mui-selected:hover": {
          bgcolor: (theme: Theme) => `${theme.palette.action.hover} !important`,
        },
      },
      iconDefault: { color: "text.secondary", "& svg": { fontSize: 30 } },
      iconSelected: { color: "primary.main", "& svg": { fontSize: 30 } },
      textDefault: { fontSize: 20, fontWeight: 600, color: "text.secondary" },
      textSelected: { fontSize: 20, fontWeight: 600, color: "primary.main" },
    }),
    []
  );

  const ItemRow = React.useMemo(() => {
    type Props = {
      item: { label: string; route: string; icon: React.ReactNode };
      selected: boolean;
      onNavigate: (r: string, e?: React.MouseEvent<HTMLElement>) => void;
    };

    const Row: React.FC<Props> = ({ item, selected, onNavigate }) => {
      return (
        <ListItem disablePadding sx={{ px: 0 }} key={item.route}>
          <ListItemButton
            onClick={(e) => onNavigate(item.route, e)}
            selected={selected}
            sx={styles.button}
          >
            <ListItemIcon
              sx={selected ? styles.iconSelected : styles.iconDefault}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={selected ? styles.textSelected : styles.textDefault}
                >
                  {item.label}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      );
    };

    return React.memo(Row);
  }, [styles]);

  return (
    <Box sx={{ p: 2.5 }}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        fontWeight={600}
        fontSize={30}
        sx={{ mb: 2.5 }}
      >
        ScrollBooker
      </Typography>
      <Box>
        {items.map((it) => {
          const selected =
            pathname === it.route || pathname.startsWith(it.route + "/");
          const Row = ItemRow;
          return (
            <Row
              key={it.route}
              item={it}
              selected={selected}
              onNavigate={navigate}
            />
          );
        })}

        <Popper
          open={moreOpen}
          anchorEl={moreAnchorEl}
          placement="right-start"
          style={{ zIndex: 1400 }}
        >
          <ClickAwayListener onClickAway={() => setMoreOpen(false)}>
            <Paper
              sx={{ p: 2, width: 300, maxHeight: 400, overflow: "auto" }}
              elevation={8}
            >
              <Typography
                variant="h6"
                sx={{ mb: 1 }}
                color="text.secondary"
                fontWeight={600}
                fontSize={16}
              >
                Setări
              </Typography>
              <List>
                <ListItem disablePadding sx={{ px: 0 }}>
                  <ListItemButton
                    onMouseEnter={(e) =>
                      openThemePopper(e.currentTarget as HTMLElement)
                    }
                    onMouseLeave={() => scheduleCloseThemePopper()}
                    onClick={(e) =>
                      openThemePopper(e.currentTarget as HTMLElement)
                    }
                    sx={styles.button}
                  >
                    <ListItemIcon>
                      <DarkModeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography>Tema aplicatiei</Typography>}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ px: 0 }}>
                  <ListItemButton onClick={(e) => {}} sx={styles.button}>
                    <ListItemIcon>
                      <LogoutIcon color="error" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography>Delogare</Typography>} />
                  </ListItemButton>
                </ListItem>
                <Popper
                  open={themeOpen}
                  anchorEl={themeAnchorEl}
                  placement="right-start"
                  style={{ zIndex: 1500 }}
                >
                  <Paper
                    onMouseEnter={() => openThemePopper(themeAnchorEl)}
                    onMouseLeave={() => scheduleCloseThemePopper()}
                    sx={{ p: 1, width: 220 }}
                    elevation={10}
                  >
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => {
                            setMode(ThemeModeEnum.SYSTEM);
                            setThemeOpen(false);
                            setMoreOpen(false);
                          }}
                        >
                          <ListItemIcon>
                            {mode === ThemeModeEnum.SYSTEM ? (
                              <CheckIcon color="primary" />
                            ) : null}
                          </ListItemIcon>
                          <ListItemText
                            primary={<Typography>System</Typography>}
                          />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => {
                            setMode(ThemeModeEnum.DARK);
                            setThemeOpen(false);
                            setMoreOpen(false);
                          }}
                        >
                          <ListItemIcon>
                            {mode === ThemeModeEnum.DARK ? (
                              <CheckIcon color="primary" />
                            ) : null}
                          </ListItemIcon>
                          <ListItemText
                            primary={<Typography>Dark</Typography>}
                          />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => {
                            setMode(ThemeModeEnum.LIGHT);
                            setThemeOpen(false);
                            setMoreOpen(false);
                          }}
                        >
                          <ListItemIcon>
                            {mode === ThemeModeEnum.LIGHT ? (
                              <CheckIcon color="primary" />
                            ) : null}
                          </ListItemIcon>
                          <ListItemText
                            primary={<Typography>Light</Typography>}
                          />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Paper>
                </Popper>
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>

        {!isAuthenticated && (
          <CButton
            onClick={() => router.push("/api/auth/signin")}
            label="Conectare"
            variant="outlined"
            sx={{ mt: 2.5 }}
          />
        )}

        {isAuthenticated && (
          <Protected permission="ADMIN_BUTTON_VIEW">
            <CButton
              variant="outlined"
              onClick={() => router.push("/admin/calendar")}
              label="Admin Panel"
              sx={{ mt: 2.5 }}
            />
          </Protected>
        )}

        <Divider sx={{ my: 2.5 }} />
      </Box>
    </Box>
  );
};

export default MarketplaceDrawer;
