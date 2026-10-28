"use client";

import { Box, Typography } from "@mui/material";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";

const ReportProblemModule = () => {
  return (
    <Box>
      <HeaderMobile title="Raportează o problemă" />
      <Typography sx={{ color: "text.secondary", p: { xs: 2.5, lg: 0 } }}>
        În curând vei putea raporta o problemă direct din aplicație.
      </Typography>
    </Box>
  );
};

export default ReportProblemModule;
