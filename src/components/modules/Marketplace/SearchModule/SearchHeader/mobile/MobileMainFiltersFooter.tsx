import { Divider, Stack } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import MobileSelectionChipButton from "./MobileSelectionChipButton";
import MobileSheetActions from "./MobileSheetActions";

type MobileMainFiltersFooterProps = {
  isClearEnabled: boolean;
  isConfirmEnabled: boolean;
  onClear: () => void;
  onConfirm: () => void;
  serviceSummary: string;
  isServiceActive: boolean;
  onOpenService: () => void;
  onClearService: () => void;
  dateTimeSummary: string;
  isDateTimeActive: boolean;
  onOpenDateTime: () => void;
  onClearDateTime: () => void;
};

const MobileMainFiltersFooter = ({
  isClearEnabled,
  isConfirmEnabled,
  onClear,
  onConfirm,
  serviceSummary,
  isServiceActive,
  onOpenService,
  onClearService,
  dateTimeSummary,
  isDateTimeActive,
  onOpenDateTime,
  onClearDateTime,
}: MobileMainFiltersFooterProps) => {
  return (
    <>
      <Divider />

      <Stack direction="row" gap={1.5} sx={{ px: 2, pt: 2 }}>
        <MobileSelectionChipButton
          icon={<ListIcon fontSize="small" color="action" />}
          title={serviceSummary}
          isActive={isServiceActive}
          isEnabled={isServiceActive}
          onTap={onOpenService}
          onClear={onClearService}
        />

        <MobileSelectionChipButton
          icon={<AccessTimeIcon fontSize="small" color="action" />}
          title={dateTimeSummary}
          isActive={isDateTimeActive}
          onTap={onOpenDateTime}
          onClear={onClearDateTime}
        />
      </Stack>

      <MobileSheetActions
        showDivider={false}
        isClearEnabled={isClearEnabled}
        isConfirmEnabled={isConfirmEnabled}
        onClear={onClear}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default MobileMainFiltersFooter;
