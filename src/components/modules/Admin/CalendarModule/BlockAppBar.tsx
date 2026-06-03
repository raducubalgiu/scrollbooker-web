import { AppointmentBlockSlot } from "@/ts/models/booking/appointment/Appointment";
import {
  AppBar,
  Box,
  Button,
  Stack,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { forwardRef } from "react";
import BlockIcon from "@mui/icons-material/Block";
import { isEmpty } from "lodash";

type BlockAppBarProps = {
  selectedSlotsToBlock: AppointmentBlockSlot[];
  onReset: () => void;
};

const BlockAppBar = forwardRef<HTMLDivElement, BlockAppBarProps>(
  ({ selectedSlotsToBlock, onReset }, ref) => {
    const selectedSlotsLength = selectedSlotsToBlock.length;
    const subtitle = isEmpty(selectedSlotsToBlock)
      ? "Selectează unul sau mai multe sloturi libere din calendar pentru a le bloca."
      : `Ai selectat ${selectedSlotsLength} ${
          selectedSlotsLength === 1 ? "slot" : "sloturi"
        } pentru blocare.`;

    return (
      <AppBar
        ref={ref}
        position="fixed"
        color="inherit"
        elevation={0}
        sx={styles.container}
      >
        <Toolbar sx={styles.toolbar}>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              Modul de blocare intervale este activ
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500, mt: 0.25 }}
            >
              {subtitle}
            </Typography>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="text"
              color="inherit"
              size="large"
              onClick={onReset}
              sx={styles.cancelButton}
            >
              Renunță
            </Button>

            <Button
              variant="contained"
              color="error"
              size="large"
              disableElevation
              startIcon={<BlockIcon />}
              disabled={isEmpty(selectedSlotsToBlock)}
              onClick={() => {}}
              sx={styles.blockButton}
            >
              Blochează ({selectedSlotsLength})
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    );
  }
);

BlockAppBar.displayName = "BlockAppBar";

export default BlockAppBar;

const styles = {
  container: (theme: Theme) => ({
    top: "auto",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.modal - 1,
    borderTop: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
    boxShadow:
      theme.palette.mode === "light"
        ? "0px -8px 24px rgba(0, 0, 0, 0.06)"
        : "0px -8px 24px rgba(0, 0, 0, 0.4)",
  }),
  toolbar: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    justifyContent: "space-between",
    p: "20px 40px !important",
    gap: 2,
  },
  cancelButton: {
    borderRadius: 2.5,
    textTransform: "none",
    fontWeight: 700,
    fontSize: "15px",
    px: 3,
    height: 46,
    color: "text.secondary",
    "&:hover": { backgroundColor: "action.hover" },
  },
  blockButton: {
    borderRadius: 2.5,
    textTransform: "none",
    fontWeight: 700,
    fontSize: "15px",
    px: 4,
    height: 46,
    boxShadow: "none",
    "&:disabled": {
      backgroundColor: "action.disabledBackground",
      color: "text.disabled",
    },
  },
};
