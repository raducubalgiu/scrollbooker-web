"use client";

import { Box, Stack } from "@mui/material";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import AccountActionCard from "./AccountActionCard";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";

const DeactivateDeleteAccountModule = () => {
  const { navigateTo } = useAppNavigation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <HeaderMobile title="Dezactivează sau șterge contul" />

      <Stack spacing={2} sx={{ px: 2.5, pt: 2.5 }}>
        <AccountActionCard
          title="Șterge contul permanent"
          description="Contul și toate datele asociate vor fi șterse definitiv, fără posibilitate de recuperare."
          titleColor="error.main"
          onClick={() => navigateTo(AppRoutes.deleteAccount())}
        />

        <AccountActionCard
          title="Dezactivează contul"
          description="Profilul tău devine invizibil temporar. Te poți reactiva oricând, autentificându-te din nou."
          onClick={() => {}}
        />
      </Stack>
    </Box>
  );
};

export default DeactivateDeleteAccountModule;
