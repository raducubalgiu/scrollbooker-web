"use client";

import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { signOut } from "next-auth/react";
import axios from "axios";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import { useDeleteAccount } from "@/controllers/auth/auth.controller";
import { AppRoutes } from "@/utils/routes";

const DeleteAccountModule = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const handleConfirmDelete = () => {
    setErrorMessage(null);

    deleteAccount(undefined, {
      onSuccess: () => {
        signOut({ callbackUrl: AppRoutes.home() });
      },
      onError: (error) => {
        setShowConfirmation(false);
        const detail = axios.isAxiosError(error)
          ? (error.response?.data as { detail?: string } | undefined)?.detail
          : undefined;
        setErrorMessage(detail || "A apărut o eroare. Încearcă din nou.");
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
      <HeaderMobile title="Șterge contul permanent" />

      <ConfirmationModal
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isPending}
        title="Ștergi contul permanent?"
        message="Această acțiune nu poate fi anulată."
        primaryActionTitle="Șterge contul"
      />

      <Stack spacing={2} sx={{ p: 2.5, pt: 3, flex: 1 }}>
        <WarningAmberIcon sx={{ fontSize: 40, color: "error.main" }} />

        <Typography variant="h6" fontWeight={700}>
          Ești sigur că vrei să ștergi contul?
        </Typography>

        <Typography color="text.secondary">
          Această acțiune este definitivă. Postările, programările,
          conversațiile și toate celelalte date asociate contului tău vor fi
          șterse permanent.
        </Typography>

        {errorMessage && (
          <Typography color="error.main" variant="body2">
            {errorMessage}
          </Typography>
        )}

        <Box sx={{ flex: 1 }} />

        <Button
          variant="contained"
          fullWidth
          disableElevation
          color="error"
          disabled={isPending}
          loading={isPending}
          onClick={() => setShowConfirmation(true)}
          sx={{ py: 1.5, fontSize: 16, fontWeight: 600, mb: 2.5 }}
        >
          Șterge contul permanent
        </Button>
      </Stack>
    </Box>
  );
};

export default DeleteAccountModule;
