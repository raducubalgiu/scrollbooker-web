import React from "react";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

type CalendarSettingsRowProps = {
  title: string;
  description: string;
  value: string;
  disabled?: boolean;
  onClick?: () => void;
};

const CalendarSettingsRow = ({
  title,
  description,
  value,
  disabled = false,
  onClick,
}: CalendarSettingsRowProps) => {
  return (
    <ButtonBase
      onClick={onClick}
      disabled={disabled || !onClick}
      sx={styles.container}
    >
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography sx={styles.title}>{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={styles.description}>
          {description}
        </Typography>
      </Box>

      <Stack direction="row" alignItems="center" gap={0.5} sx={{ flexShrink: 0 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {value}
        </Typography>
        {!disabled && onClick && (
          <ChevronRightRoundedIcon sx={{ color: "text.secondary" }} />
        )}
      </Stack>
    </ButtonBase>
  );
};

export default CalendarSettingsRow;

const styles = {
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    py: 2,
    textAlign: "left",
    "&.Mui-disabled": {
      opacity: 0.5,
    },
  },
  title: {
    fontWeight: 600,
  },
  description: {
    mt: 0.25,
  },
};
