import { alpha, AppBar, IconButton, Theme, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";

type BookingAppBarProps = {
  headerHeight: number;
  title?: string;
  onBack: () => void;
};

// Titlul pasului apare aici doar pe mobil — pe desktop rămâne afișat în
// conținutul paginii (fiecare step își are propriul <Typography variant="h2">),
// ca să economisim spațiu vertical pe ecrane mici.
const BookingAppBar = ({ headerHeight, title, onBack }: BookingAppBarProps) => {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ bgcolor: "background.default" }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: headerHeight,
          px: { xs: 2.5, md: 5 },
          gap: 1.5,
        }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
          sx={styles.back}
          edge="start"
        >
          <ArrowBackIcon fontSize="medium" />
        </IconButton>

        {title && (
          <Typography
            fontWeight={700}
            variant="h6"
            noWrap
            sx={styles.title}
          >
            {title}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default BookingAppBar;

const styles = {
  title: {
    display: { xs: "block", md: "none" },
    minWidth: 0,
  },
  back: {
    width: { xs: 40, md: 64 },
    height: { xs: 40, md: 64 },
    color: "text.primary",
    border: (theme: Theme) => ({
      xs: "none",
      md: `1.5px solid ${alpha(theme.palette.divider, 0.18)}`,
    }),
    "&:hover": {
      bgcolor: "action.hover",
    },
  },
};
