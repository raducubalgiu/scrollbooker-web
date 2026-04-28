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
import { toast } from "react-toastify";

export default function CollectEmailVerificationStep() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    if (code.length < 4) {
      toast.error("Introdu codul primit pe email");
      return;
    }

    setLoading(true);

    try {
      // TODO: call BE verify endpoint
      // await verifyEmail(code);

      toast.success("Email verificat!");
    } catch (e) {
      toast.error("Cod invalid sau expirat");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);

    try {
      // TODO: call BE resend endpoint
      // await resendEmail();

      toast.success("Email trimis din nou");
    } catch (e) {
      toast.error("Nu am putut retrimite emailul");
    } finally {
      setResending(false);
    }
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", bgcolor: "background.paper" }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3}>
          {/* Title */}
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
            loading={loading}
            onClick={handleVerify}
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
              disabled={resending}
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
