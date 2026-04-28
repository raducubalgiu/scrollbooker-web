import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import React from "react";

const CollectBirthdateStep = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3}>
          <Stack spacing={1} textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              Data de naștere
            </Typography>

            <Typography color="text.secondary">
              Folosim această informație doar pentru a-ți personaliza experiența
            </Typography>
          </Stack>

          <Stack flexDirection="row" alignItems="center" gap={1}>
            <TextField placeholder="Ziua" />
            <TextField placeholder="Luna" />
            <TextField placeholder="Anul" />
          </Stack>

          <Button
            variant="contained"
            size="large"
            fullWidth
            loading={false}
            onClick={() => {}}
            disableElevation
            sx={{ fontWeight: 600, p: 1.5, fontSize: 17 }}
          >
            Salvează
          </Button>

          <Button
            onClick={() => {}}
            disableElevation
            sx={{ fontWeight: 600, p: 1.5, fontSize: 17 }}
          >
            Prefer să nu spun
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
};

export default CollectBirthdateStep;
