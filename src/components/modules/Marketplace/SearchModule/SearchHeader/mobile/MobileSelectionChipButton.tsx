import { Box, IconButton, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";

type MobileSelectionChipButtonProps = {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  isEnabled?: boolean;
  onTap: () => void;
  onClear: () => void;
};

const MobileSelectionChipButton = ({
  icon,
  title,
  isActive,
  isEnabled = true,
  onTap,
  onClear,
}: MobileSelectionChipButtonProps) => {
  return (
    <Box
      onClick={isEnabled ? onTap : undefined}
      sx={styles.container(isEnabled)}
    >
      <Stack direction="row" alignItems="center" gap={1} sx={{ minWidth: 0 }}>
        {icon}
        <Typography
          noWrap
          fontWeight={500}
          color={isEnabled ? "text.primary" : "text.disabled"}
        >
          {title}
        </Typography>
      </Stack>

      {isActive ? (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
        >
          <CancelIcon fontSize="small" />
        </IconButton>
      ) : isEnabled ? (
        <ChevronRightIcon fontSize="small" color="action" />
      ) : null}
    </Box>
  );
};

export default MobileSelectionChipButton;

const styles = {
  container: (isEnabled: boolean) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 1,
    flex: 1,
    minWidth: 0,
    px: 2,
    py: 1.5,
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 4,
    cursor: isEnabled ? "pointer" : "default",
  }),
};
