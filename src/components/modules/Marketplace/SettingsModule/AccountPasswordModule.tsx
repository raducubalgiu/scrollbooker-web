"use client";

import { Box } from "@mui/material";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";

const AccountPasswordModule = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <HeaderMobile title="Parolă" />
    </Box>
  );
};

export default AccountPasswordModule;
