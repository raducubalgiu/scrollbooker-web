"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutate } from "@/hooks/useHttp";
import { OnboardingResponse } from "@/ts/models/onboarding/Onboarding";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CollectEmailVerificationStep() {
  const router = useRouter();
  const { update } = useSession();
  const [code, setCode] = useState("");

  const { mutate: handleVerify, isPending } = useMutate({
    key: ["verify-email"],
    url: "/api/auth/verify-email",
    options: {
      onSuccess: async (data: OnboardingResponse) => {
        await update({
          is_validated: data.is_validated,
          registration_step: data.registration_step,
        });

        router.refresh();
      },
    },
  });

  const handleResend = async () => {};

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", bgcolor: "background.paper" }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3}>
          <Stack spacing={1} textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              Verifică emailul
            </Typography>

            <Typography color="text.secondary">
              Ți-am trimis un cod pe email. Introdu-l mai jos pentru a continua.
            </Typography>
          </Stack>

          <Box>
            <TextField
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Introdu codul"
              slotProps={{
                htmlInput: {
                  maxLength: 6,
                  style: {
                    textAlign: "center",
                    fontWeight: 600,
                  },
                },
              }}
            />
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            loading={isPending}
            onClick={() => handleVerify({})}
            disableElevation
            sx={{ py: 1.5, fontSize: 16, fontWeight: 600 }}
          >
            Verifică
          </Button>

          <Stack alignItems="center" spacing={1}>
            <Typography color="text.secondary">
              Nu ai primit emailul?
            </Typography>

            <Button
              onClick={handleResend}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Trimite din nou
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
