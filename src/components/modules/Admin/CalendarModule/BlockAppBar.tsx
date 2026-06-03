import { AppointmentBlockSlot } from "@/ts/models/booking/appointment/Appointment";
import {
  AppBar,
  Box,
  Button,
  Portal,
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
  isBlocking: boolean;
  isLoadingBlock: boolean;
  onCancel: () => void;
  onBlock: () => void;
};

const BlockAppBar = forwardRef<HTMLDivElement, BlockAppBarProps>(
  (
    { selectedSlotsToBlock, isBlocking, isLoadingBlock, onCancel, onBlock },
    ref
  ) => {
    const selectedSlotsLength = selectedSlotsToBlock.length;
    const subtitle = isEmpty(selectedSlotsToBlock)
      ? "Selectează unul sau mai multe sloturi libere din calendar pentru a le bloca."
      : `Ai selectat ${selectedSlotsLength} ${
          selectedSlotsLength === 1 ? "slot" : "sloturi"
        } pentru blocare.`;

    return (
      <Portal>
        <AppBar
          ref={ref}
          position="fixed"
          color="inherit"
          elevation={0}
          sx={[
            styles.container,
            {
              transform: isBlocking ? "translateY(0)" : "translateY(100%)",
              opacity: isBlocking ? 1 : 0,
              visibility: isBlocking ? "visible" : "hidden",
              transition:
                "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, visibility 0.25s",
            },
          ]}
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
                onClick={onCancel}
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
                onClick={onBlock}
                sx={styles.blockButton}
                loading={isLoadingBlock}
                disabled={isEmpty(selectedSlotsToBlock) || isLoadingBlock}
              >
                Blochează ({selectedSlotsLength})
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </Portal>
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
