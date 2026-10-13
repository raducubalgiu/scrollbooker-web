import { Box, IconButton, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import SearchDateTimeSection from "../sections/SearchDateTimeSection";
import MobileSheetActions from "./MobileSheetActions";
import { SearchHeaderStateType } from "../search-header-types";

type MobileDateTimeStepProps = {
  state: SearchHeaderStateType;
  onSetDateTime: (dateTime: {
    startDate: string | null;
    startTime: string | null;
    endTime: string | null;
  }) => void;
  onClear: () => void;
  onBack: () => void;
};

const MobileDateTimeStep = ({
  state,
  onSetDateTime,
  onClear,
  onBack,
}: MobileDateTimeStepProps) => {
  const isClearEnabled = !!(state.startDate || state.startTime || state.endTime);

  return (
    <Box sx={styles.container}>
      <Stack direction="row" sx={{ p: 1 }}>
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
      </Stack>

      <Box sx={styles.scrollArea}>
        <SearchDateTimeSection state={state} onSetDateTime={onSetDateTime} />
      </Box>

      <MobileSheetActions
        isClearEnabled={isClearEnabled}
        onClear={onClear}
        onConfirm={onBack}
        confirmActionText="Confirmă"
      />
    </Box>
  );
};

export default MobileDateTimeStep;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    flex: 1,
  },
  scrollArea: {
    px: 2.5,
    pb: 3,
    overflowY: "auto",
    flex: 1,
    minHeight: 0,
  },
};
