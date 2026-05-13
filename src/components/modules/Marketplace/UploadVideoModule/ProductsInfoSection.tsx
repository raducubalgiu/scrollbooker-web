import {
  InfoOutlined,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  Box,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React from "react";

const ProductsInfoSection = () => {
  return (
    <Accordion disableGutters elevation={0} sx={styles.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={styles.summary}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <InfoOutlined color="info" />
          <Typography variant="subtitle2" fontWeight={700}>
            Cum funcționează serviciile atașate?
          </Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={styles.details}>
        <Box>
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
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductsInfoSection;

const styles = {
  accordion: {
    mb: 3,
    bgcolor: "info.lighter",
    borderRadius: 2,
    borderLeft: "4px solid",
    borderColor: "info.main",
    "&:before": { display: "none" },
    overflow: "hidden",
  },
  summary: {
    px: 2,
    py: 0.5,
    minHeight: "auto",
    "& .MuiAccordionSummary-content": {
      margin: "8px 0",
    },
  },
  details: {
    px: 2,
    pt: 0,
    pb: 2,
  },
} as const;
