import React from "react";
import { IconButton } from "@mui/material";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";

type ExpandCalendarButtonProps = {
  isExpanded: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

const ExpandCalendarButton = ({
  isExpanded,
  onToggle,
  disabled = false,
}: ExpandCalendarButtonProps) => {
  return (
    <IconButton
      onClick={onToggle}
      disabled={disabled}
      size="large"
      sx={{
        color: "text.primary",
        backgroundColor: "background.default",
        border: 1,
        borderColor: "divider",
      }}
    >
      {isExpanded ? (
        <FullscreenExitRoundedIcon sx={{ fontSize: 22 }} />
      ) : (
        <FullscreenRoundedIcon sx={{ fontSize: 22 }} />
      )}
    </IconButton>
  );
};

export default ExpandCalendarButton;
