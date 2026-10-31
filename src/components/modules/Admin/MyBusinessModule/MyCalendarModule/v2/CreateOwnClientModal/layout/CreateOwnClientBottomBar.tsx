import React from "react";
import { Button, Divider, Stack, Theme, Typography } from "@mui/material";

type CreateOwnClientBottomBarProps = {
  totalPrice: number;
  totalDurationMinutes: number;
  isReadyToSave: boolean;
  isLoading: boolean;
  onReset: () => void;
  onConfirm: () => void;
};

const CreateOwnClientBottomBar = ({
  totalPrice,
  totalDurationMinutes,
  isReadyToSave,
  isLoading,
  onReset,
  onConfirm,
}: CreateOwnClientBottomBarProps) => {
  return (
    <Stack sx={styles.container}>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 3, py: 2 }}
      >
        <Stack>
          <Typography fontWeight={700}>{totalPrice} lei</Typography>
          <Typography variant="body2" color="text.secondary">
            {totalDurationMinutes} min
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" color="secondary" onClick={onReset}>
            Reset
          </Button>
          <Button
            variant="contained"
            disableElevation
            loading={isLoading}
            disabled={!isReadyToSave}
            onClick={onConfirm}
          >
            Confirmă programarea
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CreateOwnClientBottomBar;

const styles = {
  container: {
    position: "sticky",
    bottom: 0,
    left: 0,
    right: 0,
    bgcolor: "background.default",
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
  },
};
