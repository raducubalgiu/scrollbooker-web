import { useThemeMode } from "@/providers/ThemeContext";
import { ThemeModeEnum } from "@/providers/ThemeModeEnum";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckIcon from "@mui/icons-material/Check";
import { signOut } from "next-auth/react";
import {
  ClickAwayListener,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Theme,
  Typography,
} from "@mui/material";
import React, { memo } from "react";

type DrawerPopperProps = {
  moreOpen: boolean;
  moreAnchorEl: HTMLElement | null;
  onCloseMore: () => void;
};

const DrawerPopper = ({
  moreOpen,
  moreAnchorEl,
  onCloseMore,
}: DrawerPopperProps) => {
  const { mode, setMode } = useThemeMode();
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

  return (
    <Popper
      open={moreOpen}
      anchorEl={moreAnchorEl}
      placement="right-start"
      style={{ zIndex: 1400 }}
    >
      <ClickAwayListener onClickAway={onCloseMore}>
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
                onClick={(e) => openThemePopper(e.currentTarget as HTMLElement)}
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
              <ListItemButton onClick={() => signOut()} sx={styles.button}>
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
                  {ThemeModeEnum.all.map((theme) => (
                    <ListItem disablePadding key={theme}>
                      <ListItemButton
                        onClick={() => {
                          setMode(theme);
                          setThemeOpen(false);
                          onCloseMore();
                        }}
                        sx={styles.button}
                      >
                        <ListItemIcon>
                          {mode === theme ? (
                            <CheckIcon color="primary" />
                          ) : null}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography textTransform="capitalize">
                              {theme.toLocaleLowerCase()}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Popper>
          </List>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default memo(DrawerPopper);
