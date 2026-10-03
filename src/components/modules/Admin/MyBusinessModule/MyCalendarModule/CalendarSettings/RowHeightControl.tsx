import React, { useState } from "react";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import DensityMediumRoundedIcon from "@mui/icons-material/DensityMediumRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import {
  ROW_HEIGHT_LEVEL_LABELS,
  ROW_HEIGHT_LEVEL_ORDER,
  RowHeightLevel,
} from "./rowHeightLevels";
import { getCalendarTableBg } from "../calendarSurfaceColors";

type RowHeightControlProps = {
  value: RowHeightLevel;
  onChange: (level: RowHeightLevel) => void;
  disabled?: boolean;
};

const RowHeightControl = ({
  value,
  onChange,
  disabled = false,
}: RowHeightControlProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <IconButton
        onClick={disabled ? undefined : (e) => setAnchorEl(e.currentTarget)}
        size="large"
        sx={{
          color: "text.primary",
          backgroundColor: getCalendarTableBg,
          border: 1,
          borderColor: "divider",
          pointerEvents: disabled ? "none" : "auto",
        }}
      >
        <DensityMediumRoundedIcon sx={{ fontSize: 22 }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {ROW_HEIGHT_LEVEL_ORDER.map((level) => (
          <MenuItem
            key={level}
            selected={level === value}
            onClick={() => {
              onChange(level);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              {level === value && (
                <CheckRoundedIcon fontSize="small" color="primary" />
              )}
            </ListItemIcon>
            {ROW_HEIGHT_LEVEL_LABELS[level]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default RowHeightControl;
