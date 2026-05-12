import { InfoOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const ProductsInfoSection = () => {
  return (
    <Box sx={styles.container}>
      <Stack direction="row" spacing={1.5}>
        <InfoOutlined color="info" sx={{ mt: 0.2 }} />
        <Box>
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>
            Servicii recomandate în acest video
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.5 }}
          >
            Selectează maximum <strong>5 servicii</strong> relevante pentru
            acest clip. Astfel, clienții tăi se pot programa direct pentru ceea
            ce văd în acest clip.
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1, fontStyle: "italic" }}
          >
            Exemplu: Dacă în video prezinți un rezultat (ex: un tuns modern sau
            o tehnică de masaj), atașează serviciile relevante din lista ta
            pentru a permite clienților să se programeze pe loc pentru oricare
            dintre ele.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductsInfoSection;

const styles = {
  container: {
    mb: 3,
    p: 2,
    bgcolor: "info.lighter",
    borderRadius: 2,
    borderLeft: "4px solid",
    borderColor: "info.main",
  },
};
