import { Box, Typography } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React from "react";

type EmptyProductsSectionProps = {
  onOpenProducts: () => void;
};

const EmptyProductsSection = ({
  onOpenProducts,
}: EmptyProductsSectionProps) => {
  return (
    <Box onClick={onOpenProducts} sx={styles.container}>
      <AddBoxOutlinedIcon color="primary" sx={{ fontSize: 32, opacity: 0.7 }} />

      <Box>
        <Typography variant="body2" color="text.primary" fontWeight={600}>
          Niciun serviciu atașat încă
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 0.5, px: 2 }}
        >
          Apasă aici pentru a atașa serviciile relevante și a facilita
          programările clienților.
        </Typography>
      </Box>
    </Box>
  );
};

export default EmptyProductsSection;

const styles = {
  container: {
    p: 4,
    border: "2px dotted",
    borderColor: "divider",
    borderRadius: 4,
    textAlign: "center",
    bgcolor: "action.hover",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1.5,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      borderColor: "primary.main",
      bgcolor: "primary.lighter",
    },
  },
};
