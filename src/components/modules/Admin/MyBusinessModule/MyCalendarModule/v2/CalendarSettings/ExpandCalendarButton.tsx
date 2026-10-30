import React from "react";
import { IconButton } from "@mui/material";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";
import { getCalendarTableBg } from "../calendarSurfaceColors";

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
      onClick={disabled ? undefined : onToggle}
      size="large"
      sx={{
        color: "text.primary",
        backgroundColor: getCalendarTableBg,
        border: 1,
        borderColor: "divider",
        pointerEvents: disabled ? "none" : "auto",
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
