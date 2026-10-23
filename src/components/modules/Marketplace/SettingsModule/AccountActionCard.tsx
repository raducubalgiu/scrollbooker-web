"use client";

import { Box, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type AccountActionCardProps = {
  title: string;
  description: string;
  titleColor?: string;
  onClick: () => void;
};

const AccountActionCard = ({
  title,
  description,
  titleColor = "text.primary",
  onClick,
}: AccountActionCardProps) => {
  return (
    <Box sx={styles.card} onClick={onClick}>
      <Stack sx={{ minWidth: 0 }}>
        <Typography fontWeight={600} sx={{ color: titleColor }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Stack>

      <ChevronRightIcon sx={{ color: "text.secondary", flexShrink: 0 }} />
    </Box>
  );
};

export default AccountActionCard;

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    p: 2,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    cursor: "pointer",
  },
};
