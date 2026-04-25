import { alpha, AppBar, IconButton, Theme, Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

type BookingAppBarProps = {
  onBack: () => void;
};

const BookingAppBar = ({ onBack }: BookingAppBarProps) => {
  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar disableGutters sx={{ height: 90, px: 5 }}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
          sx={styles.back}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default BookingAppBar;

const styles = {
  back: {
    width: 64,
    height: 64,
    color: "text.primary",
    border: (theme: Theme) =>
      `1.5px solid ${alpha(theme.palette.divider, 0.18)}`,
    "&:hover": {
      bgcolor: "action.hover",
    },
  },
};
