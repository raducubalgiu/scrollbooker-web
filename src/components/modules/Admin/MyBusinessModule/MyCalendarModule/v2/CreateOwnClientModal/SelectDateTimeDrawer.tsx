"use client";

import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DateTimeSelectionContent, {
  DateTimeSelectionContentProps,
} from "./DateTimeSelectionContent";

type SelectDateTimeDrawerProps = DateTimeSelectionContentProps & {
  open: boolean;
  onClose: () => void;
};

const SelectDateTimeDrawer = ({
  open,
  onClose,
  ...contentProps
}: SelectDateTimeDrawerProps) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={styles.drawer}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, pb: 1.5 }}
      >
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>

        <Typography fontWeight={700}>Alege data și ora</Typography>

        <Box sx={{ width: 34 }} />
      </Stack>
      <Divider />

      <DateTimeSelectionContent {...contentProps} />
    </Drawer>
  );
};

export default SelectDateTimeDrawer;

const styles = {
  drawer: {
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
  },
  paper: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: "90vh",
    display: "flex",
    flexDirection: "column",
  },
};
