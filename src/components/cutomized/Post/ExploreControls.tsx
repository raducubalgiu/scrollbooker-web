import { IconButton, Stack } from "@mui/material";
import React from "react";
import ChevronIcon from "@/assets/icons/ic_arrow-chevron_down_outline.svg";
import CustomSvg from "@/components/core/CustomSvg/CustomSvg";

type ExploreControlsProps = {
  isDisabledPrev: boolean;
  isDisabledNext: boolean;
  onGoToPrev: () => void;
  onGoToNext: () => void;
};

const getButtonStyles = (isDisabled: boolean) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  bgcolor: "background.paper",
  opacity: isDisabled ? 0.4 : 1,
});

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
        disableRipple
        sx={getButtonStyles(isDisabledPrev)}
      >
        <CustomSvg
          src={ChevronIcon}
          size={26}
          sx={{ backgroundColor: "text.primary", transform: "rotate(180deg)" }}
        />
      </IconButton>
      <IconButton
        onClick={onGoToNext}
        disabled={isDisabledNext}
        disableRipple
        sx={getButtonStyles(isDisabledNext)}
      >
        <CustomSvg
          src={ChevronIcon}
          size={26}
          sx={{ backgroundColor: "text.primary" }}
        />
      </IconButton>
    </Stack>
  );
};

export default ExploreControls;
