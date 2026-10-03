import React from "react";
import { Box, Typography, ButtonBase, alpha, Theme } from "@mui/material";

type MyBusinessCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export default function MyBusinessCard({
  title,
  description,
  icon,
  onClick,
}: MyBusinessCardProps) {
  return (
    <ButtonBase onClick={onClick} disableRipple sx={styles.container}>
      <Box sx={{ p: 2.5 }}>
        {icon}

        <Typography variant="body1" fontWeight={700} sx={styles.title}>
          {title}
        </Typography>

        <Typography variant="caption" sx={styles.description}>
          {description}
        </Typography>
      </Box>
    </ButtonBase>
  );
}

const styles = {
  container: {
    display: "block",
    textAlign: "left",
    width: "100%",
    borderRadius: 2,
    backgroundColor: "background.paper",
    transition: "background-color 0.2s ease",

    "&:hover": {
      backgroundColor: (theme: Theme) =>
        alpha(theme.palette.action.hover, 0.05),
    },
  },
  title: {
    color: "text.primary",
    lineHeight: 1.3,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    overflow: "hidden",
    mt: 2,
    mb: 0.75,
  },
  description: {
    color: "text.secondary",
    lineHeight: 1.4,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    minHeight: "4.2em",
  },
};
