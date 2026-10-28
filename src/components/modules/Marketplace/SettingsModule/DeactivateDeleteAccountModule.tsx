"use client";

import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import AccountActionCard from "./AccountActionCard";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useDeactivateAccount } from "@/controllers/auth/auth.controller";
import { AppRoutes } from "@/utils/routes";

const DeactivateDeleteAccountModule = () => {
  const { navigateTo } = useAppNavigation();
  const { data: session } = useSession();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: deactivateAccount, isPending } = useDeactivateAccount();

  const isBusinessOrEmployee = !!session?.business_id || !!session?.is_employee;

  const handleConfirmDeactivate = () => {
    setErrorMessage(null);

    deactivateAccount(undefined, {
      onSuccess: () => {
        signOut({ callbackUrl: AppRoutes.home() });
      },
      onError: () => {
        setShowConfirmation(false);
        setErrorMessage("A apărut o eroare. Încearcă din nou.");
      },
    });
  };

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

      <ConfirmationModal
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmDeactivate}
        isLoading={isPending}
        title="Dezactivezi contul?"
        message="Profilul, postările și comentariile tale nu vor mai fi vizibile. Te poți reactiva oricând, autentificându-te din nou."
        primaryActionTitle="Dezactivează"
      />

      {isBusinessOrEmployee ? (
        <Typography color="text.secondary" sx={{ px: 2.5, pt: 2.5 }}>
          Dezactivarea și ștergerea contului nu sunt disponibile momentan
          pentru conturile de business și de angajat.
        </Typography>
      ) : (
        <Stack spacing={2} sx={{ px: 2.5, pt: 2.5 }}>
          <AccountActionCard
            title="Șterge contul permanent"
            description="Contul și toate datele asociate vor fi șterse definitiv după 30 de zile."
            titleColor="error.main"
            onClick={() => navigateTo(AppRoutes.deleteAccount())}
          />

          <AccountActionCard
            title="Dezactivează contul"
            description="Profilul tău devine invizibil temporar. Te poți reactiva oricând, autentificându-te din nou."
            onClick={() => setShowConfirmation(true)}
          />

          {errorMessage && (
            <Typography color="error.main" variant="body2">
              {errorMessage}
            </Typography>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default DeactivateDeleteAccountModule;
