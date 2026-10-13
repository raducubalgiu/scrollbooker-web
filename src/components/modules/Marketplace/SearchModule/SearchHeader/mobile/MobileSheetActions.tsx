import { Button, Divider, Stack } from "@mui/material";
import React from "react";

type MobileSheetActionsProps = {
  onClear: () => void;
  onConfirm: () => void;
  isClearEnabled?: boolean;
  isConfirmEnabled?: boolean;
  clearActionText?: string;
  confirmActionText?: string;
  showDivider?: boolean;
};

const MobileSheetActions = ({
  onClear,
  onConfirm,
  isClearEnabled = true,
  isConfirmEnabled = true,
  clearActionText = "Șterge",
  confirmActionText = "Caută",
  showDivider = true,
}: MobileSheetActionsProps) => {
  return (
    <>
      {showDivider && <Divider />}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2 }}
      >
        <Button
          color="inherit"
          disabled={!isClearEnabled}
          onClick={onClear}
          sx={{ fontWeight: 700, textTransform: "none" }}
        >
          {clearActionText}
        </Button>

        <Button
          variant="contained"
          disableElevation
          disabled={!isConfirmEnabled}
          onClick={onConfirm}
          sx={{ textTransform: "none", borderRadius: 50, px: 4 }}
        >
          {confirmActionText}
        </Button>
      </Stack>
    </>
  );
};

export default MobileSheetActions;
