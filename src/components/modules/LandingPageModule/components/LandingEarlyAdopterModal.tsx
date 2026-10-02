"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import Input from "@/components/core/Input/Input";
import { emailField, required } from "@/utils/validation-rules";
import { useCreateEarlyAdopterMutation } from "@/controllers/earlyAdopters/earlyAdopters.controller";
import { LANDING_COLORS } from "../landing.constants";
import { lightTheme } from "../../../../../theme/theme";

type EarlyAdopterForm = {
  firstName: string;
  lastName: string;
  city: string;
  email: string;
};

type LandingEarlyAdopterModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function LandingEarlyAdopterModal({
  open,
  onClose,
}: LandingEarlyAdopterModalProps) {
  const t = useTranslations("earlyAdopters");
  const [submitted, setSubmitted] = useState(false);
  const isRequired = required();
  const isEmail = emailField();
  const { mutate: createEarlyAdopter, isPending } = useCreateEarlyAdopterMutation();

  const methods = useForm<EarlyAdopterForm>({
    defaultValues: { firstName: "", lastName: "", city: "", email: "" },
  });

  const handleSignUp = (data: EarlyAdopterForm) => {
    createEarlyAdopter(
      {
        first_name: data.firstName,
        last_name: data.lastName,
        city: data.city,
        email: data.email,
      },
      {
        onSuccess: () => setSubmitted(true),
        onError: () => toast.error(t("errorMessage")),
      }
    );
  };

  const handleExited = () => {
    setSubmitted(false);
    methods.reset();
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        TransitionProps={{ onExited: handleExited }}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: LANDING_COLORS.surface,
            border: `1px solid ${LANDING_COLORS.border}`,
            borderRadius: 4,
          },
        }}
      >
        <Box sx={{ position: "relative", p: { xs: 3, sm: 4 } }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: LANDING_COLORS.textSecondary,
            }}
          >
            <CloseRoundedIcon />
          </IconButton>

          {submitted ? (
            <Stack
              spacing={2}
              alignItems="center"
              sx={{ textAlign: "center", py: 2 }}
            >
              <CheckCircleRoundedIcon
                sx={{ fontSize: 48, color: LANDING_COLORS.primary }}
              />
              <Typography
                variant="h5"
                sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 700 }}
              >
                {t("successTitle")}
              </Typography>
              <Typography sx={{ color: LANDING_COLORS.textSecondary }}>
                {t("successSubtitle")}
              </Typography>
            </Stack>
          ) : (
            <>
              <Stack spacing={1} sx={{ mb: 3, pr: 3 }}>
                <Typography
                  variant="h5"
                  sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 700 }}
                >
                  {t("modalTitle")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: LANDING_COLORS.textSecondary }}
                >
                  {t("modalDescription")}
                </Typography>
              </Stack>

              <FormProvider {...methods}>
                <Stack spacing={2}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Input
                      name="firstName"
                      label={t("firstNameLabel")}
                      rules={isRequired}
                    />
                    <Input
                      name="lastName"
                      label={t("lastNameLabel")}
                      rules={isRequired}
                    />
                  </Stack>

                  <Input name="city" label={t("cityLabel")} rules={isRequired} />

                  <Input
                    name="email"
                    label={t("emailLabel")}
                    rules={{ ...isRequired, ...isEmail }}
                  />

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    disableElevation
                    loading={isPending}
                    disabled={isPending}
                    onClick={methods.handleSubmit(handleSignUp)}
                    sx={{
                      mt: 1,
                      py: 1.5,
                      fontWeight: 700,
                      textTransform: "none",
                      backgroundColor: LANDING_COLORS.primary,
                      "&:hover": { backgroundColor: LANDING_COLORS.primaryDark },
                    }}
                  >
                    {t("submit")}
                  </Button>
                </Stack>
              </FormProvider>
            </>
          )}
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}
