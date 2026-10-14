import { alpha, AppBar, IconButton, Theme, Toolbar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";

type BookingAppBarProps = {
  headerHeight: number;
  onBack: () => void;
};

const BookingAppBar = ({ headerHeight, onBack }: BookingAppBarProps) => {
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
      </Toolbar>
    </AppBar>
  );
};

export default BookingAppBar;

const styles = {
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
