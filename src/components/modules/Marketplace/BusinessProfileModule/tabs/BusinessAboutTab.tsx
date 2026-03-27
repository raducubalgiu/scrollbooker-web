import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

type BusinessAboutTabProps = {
  id: string;
  innerRef: (element: HTMLDivElement | null) => void;
};

const BusinessAboutTab = ({ id, innerRef }: BusinessAboutTabProps) => {
  return (
    <Box
      id={id}
      ref={innerRef}
      sx={{
        mb: 3,
        p: 3,
        minHeight: "100vh",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        width: "100%",
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom>
        About
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Conținut pentru secțiunea servicii. Aici poți avea cards, liste,
        produse, review-uri, descrieri și alte blocuri de UI.
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Adaugă suficient conținut aici încât pagina să poată fi scrollată și să
        vezi cum se schimbă tab-ul activ automat.
      </Typography>
    </Box>
  );
};

export default memo(BusinessAboutTab);
