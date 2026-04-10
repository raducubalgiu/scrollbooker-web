import { IconButton, Stack } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import React from "react";

type ExploreControlsProps = {
  isDisabledPrev: boolean;
  isDisabledNext: boolean;
  onGoToPrev: () => void;
  onGoToNext: () => void;
};

const ExploreControls = ({
  isDisabledPrev,
  isDisabledNext,
  onGoToPrev,
  onGoToNext,
}: ExploreControlsProps) => {
  return (
    <Stack
      sx={{
        flex: "0 0 auto",
        height: "100%",
        justifyContent: "center",
        gap: 2.5,
      }}
    >
      <IconButton
        onClick={onGoToPrev}
        disabled={isDisabledPrev}
        sx={{ width: 70, height: 70, bgcolor: "secondary.main" }}
      >
        <ArrowUpwardIcon fontSize="large" />
      </IconButton>
      <IconButton
        onClick={onGoToNext}
        disabled={isDisabledNext}
        sx={{ width: 70, height: 70, bgcolor: "secondary.main" }}
      >
        <ArrowDownwardIcon fontSize="large" />
      </IconButton>
    </Stack>
  );
};

export default ExploreControls;
