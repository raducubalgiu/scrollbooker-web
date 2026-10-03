import { Add } from "@mui/icons-material";
import {
  alpha,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

type ProductVariantsHeaderProps = {
  onAdd: () => void;
};

const ProductVariantsHeader = ({ onAdd }: ProductVariantsHeaderProps) => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
    >
      <Box>
        <Typography variant="h6" fontWeight="700">
          Variante și Prețuri
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gestionează duratele și prețurile angajaților.
        </Typography>
      </Box>
      <Tooltip title="Adaugă o varianta">
        <IconButton
          onClick={onAdd}
          size="large"
          sx={{
            bgcolor: "primary.main",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.9),
            },
          }}
        >
          <Add fontSize="medium" sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default ProductVariantsHeader;
