import Input from "@/components/core/Input/Input";
import { required } from "@/utils/validation-rules";
import {
  Button,
  Container,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const CollectUsernameStep = () => {
  const methods = useForm({ defaultValues: { username: "" } });
  const isRequired = required();

  return (
    <FormProvider {...methods}>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Container maxWidth="sm">
          <Stack mb={2} gap={0.5}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Nume de utilizator
            </Typography>

            <Typography color="text.secondary">
              Alege un nume unic pentru profilul tău. Poți alege orice variantă
              disponibilă
            </Typography>
          </Stack>

          <Input
            name="username"
            rules={isRequired}
            placeholder="Username"
            sx={{ mb: 1.5 }}
            size="medium"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

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
        </Container>
      </Stack>
    </FormProvider>
  );
};

export default CollectUsernameStep;
