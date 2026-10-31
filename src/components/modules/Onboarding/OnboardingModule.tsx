"use client";

import React, { useMemo } from "react";
import { Session } from "next-auth";
import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "@/controllers/auth/auth.controller";

import {
  displayStepLabel,
  RegistrationStepEnum,
} from "@/ts/enums/RegistrationStepEnum";
import BrandHeader from "@/components/core/BrandHeader/BrandHeader";
import BrandGlow from "@/components/core/BrandGlow/BrandGlow";
import { useTranslations } from "next-intl";

import CollectEmailVerificationStep from "./shared/CollectEmailVerification";
import CollectUsernameStep from "./shared/CollectUsernameStep";
import CollectBirthdateStep from "./client/CollectBirthdateStep";
import CollectGenderStep from "./client/CollectGenderStep";
import CollectBusinessStep from "./business/collect-business/CollectBusinessStep";
import CollectBusinessServicesStep from "./business/CollectBusinessServicesStep";
import CollectBusinessSchedulesStep from "./business/CollectBusinessSchedulesStep";
import CollectBusinessHasEmployeesStep from "./business/CollectBusinessHasEmployeesStep";
import CollectBusinessValidationStep from "./business/CollectBusinessValidationStep";
import CollectLocationPermission from "./client/CollectLocationPermission";
import CollectBusinessGalleryStep from "./business/CollectBusinessGalleryStep";
import CollectBusinessInstantBookingStep from "./business/CollectBusinessInstantBookingStep";
import CollectBusinessPublicPhone from "./business/CollectBusinessPublicPhone";

type OnboardingModuleProps = {
  session: Session | null;
};

export default function OnboardingModule({ session }: OnboardingModuleProps) {
  const t = useTranslations("onboarding");
  const step = session?.registration_step;

  const steps = [
    RegistrationStepEnum.COLLECT_BUSINESS,
    RegistrationStepEnum.COLLECT_BUSINESS_GALLERY,
    RegistrationStepEnum.COLLECT_BUSINESS_SERVICES,
    RegistrationStepEnum.COLLECT_BUSINESS_SCHEDULES,
    RegistrationStepEnum.COLLECT_BUSINESS_HAS_EMPLOYEES,
    RegistrationStepEnum.COLLECT_BUSINESS_INSTANT_BOOKING,
  ];

  const activeStepIndex = steps.findIndex((s) => s === step);
  const shouldDisplayStepper = step
    ? steps.includes(step as RegistrationStepEnum)
    : false;

  const stepContent = useMemo(() => {
    switch (step) {
      case RegistrationStepEnum.COLLECT_USER_EMAIL_VALIDATION:
        return <CollectEmailVerificationStep />;
      case RegistrationStepEnum.COLLECT_USER_USERNAME:
        return <CollectUsernameStep />;
      case RegistrationStepEnum.COLLECT_CLIENT_BIRTHDATE:
        return <CollectBirthdateStep />;
      case RegistrationStepEnum.COLLECT_CLIENT_GENDER:
        return <CollectGenderStep />;
      case RegistrationStepEnum.COLLECT_CLIENT_LOCATION_PERMISSION:
        return <CollectLocationPermission />;
      case RegistrationStepEnum.COLLECT_BUSINESS:
        return <CollectBusinessStep />;
      case RegistrationStepEnum.COLLECT_BUSINESS_GALLERY:
        return <CollectBusinessGalleryStep />;
      case RegistrationStepEnum.COLLECT_BUSINESS_SERVICES:
        return <CollectBusinessServicesStep />;
      case RegistrationStepEnum.COLLECT_BUSINESS_SCHEDULES:
        return <CollectBusinessSchedulesStep />;
      case RegistrationStepEnum.COLLECT_BUSINESS_HAS_EMPLOYEES:
        return <CollectBusinessHasEmployeesStep />;
      case RegistrationStepEnum.COLLECT_BUSINESS_INSTANT_BOOKING:
        return <CollectBusinessInstantBookingStep />;
      case RegistrationStepEnum.COLLECT_BUSINESS_PUBLIC_PHONE:
        return <CollectBusinessPublicPhone />;
      case RegistrationStepEnum.COLLECT_BUSINESS_VALIDATION:
        return <CollectBusinessValidationStep />;
      default:
        return null;
    }
  }, [step]);

  return (
    <Box sx={styles.outer}>
      <BrandGlow />

      <BrandHeader
        maxWidth={false}
        action={
          <Button
            size="small"
            color="inherit"
            startIcon={<LogoutIcon fontSize="small" />}
            onClick={() => logout()}
            sx={{ textTransform: "none", color: "text.secondary" }}
          >
            {t("logout")}
          </Button>
        }
      />

      <Box sx={styles.contentArea}>
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          <Grid container sx={{ height: "100%" }} spacing={0}>
            {shouldDisplayStepper && (
              <Grid size={{ xs: 0, md: 3 }} sx={styles.leftColumnContainer}>
                <Typography
                  variant="h4"
                  sx={{ mb: 6, fontWeight: 900, letterSpacing: "-0.03em" }}
                >
                  {t("stepperTitle")}
                </Typography>

                <Stepper
                  activeStep={activeStepIndex}
                  orientation="vertical"
                  sx={styles.stepper}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel sx={styles.stepLabel}>
                        {displayStepLabel(label, t)}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
            )}

            <Grid
              size={{ xs: 12, md: shouldDisplayStepper ? 8 : 13 }}
              sx={styles.rightColumn}
            >
              {stepContent}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

const styles = {
  outer: {
    position: "relative",
    overflow: "hidden",
    bgcolor: "background.default",
    height: "100dvh",
    display: "flex",
    flexDirection: "column",
  },
  contentArea: {
    position: "relative",
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
  },
  leftColumnContainer: {
    display: { xs: "none", md: "flex" },
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRight: "1px solid",
    borderColor: "divider",
    height: "100%",
    pr: 4,
    pt: 5,
  },
  stepper: {
    "& .MuiStepConnector-line": {
      minHeight: 40,
      borderLeftWidth: 2,
      borderColor: "grey.100",
    },
    "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
      borderColor: "primary.main",
    },
    "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
      borderColor: "primary.main",
    },

    "& .MuiStepLabel-root": {
      py: 1.5,
    },
    "& .MuiStepLabel-label": {
      fontSize: "1.05rem",
      ml: 1,
      color: "text.disabled",
      fontWeight: 500,
    },
    "& .MuiStepLabel-label.Mui-active": {
      color: "text.primary",
      fontWeight: 700,
    },
    "& .MuiStepLabel-label.Mui-completed": {
      color: "text.secondary",
    },

    "& .MuiStepIcon-root": {
      fontSize: 30,
      color: "grey.200",
      "&.Mui-active": {
        color: "primary.main",
      },
      "&.Mui-completed": {
        color: "primary.main",
      },
    },
    "& .MuiStepIcon-text": {
      fill: "grey.500",
      fontSize: "14px",
      fontWeight: 700,
    },
    "& .Mui-active .MuiStepIcon-text": {
      fill: "white",
    },
  },
  stepLabel: {
    py: 1.5,
    "& .MuiStepLabel-label": {
      fontSize: "1.05rem",
      ml: 1,
      color: "text.disabled",
      fontWeight: 500,
    },
    "& .MuiStepLabel-label.Mui-active": {
      color: "text.primary",
      fontWeight: 700,
    },
    "& .MuiStepIcon-root": {
      fontSize: 30,
      "&.Mui-active": { color: "primary.main" },
      "&.Mui-completed": { color: "primary.main" },
    },
  },
  rightColumn: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
};
