import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

type BusinessServicesTabProps = {
  id: string;
  innerRef: (element: HTMLDivElement | null) => void;
};

const BusinessServicesTab = ({ id, innerRef }: BusinessServicesTabProps) => {
  return (
    <Box id={id} ref={innerRef}>
      <Typography variant="h4" fontWeight={600} gutterBottom mt={5}>
        Servicii
      </Typography>

      <Typography sx={{ color: "text.secondary" }}>
        Nu au fost gasite servicii
      </Typography>
    </Box>
  );
};

export default memo(BusinessServicesTab);
