"use client";

import CollectEmailVerificationStep from "./shared/CollectEmailVerification";
import CollectUsernameStep from "./shared/CollectUsernameStep";
import { RegistrationStepEnum } from "@/ts/enums/RegistrationStepEnum";
import CollectBirthdateStep from "./client/CollectBirthdateStep";
import CollectGenderStep from "./client/CollectGenderStep";
import { Session } from "next-auth";
import CollectBusinessStep from "./business/collect-business/CollectBusinessStep";
import CollectBusinessServicesStep from "./business/CollectBusinessServicesStep";
import CollectBusinessSchedulesStep from "./business/CollectBusinessSchedulesStep";
import CollectBusinessHasEmployeesStep from "./business/CollectBusinessHasEmployeesStep";
import CollectBusinessValidationStep from "./business/CollectBusinessValidationStep";
import CollectLocationPermission from "./client/CollectLocationPermission";
import { Box } from "@mui/material";
import { useMemo } from "react";

type OnboardingModuleProps = {
  session: Session | null;
};

export default function OnboardingModule({ session }: OnboardingModuleProps) {
  const step = session?.registration_step;

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
      case RegistrationStepEnum.COLLECT_BUSINESS_SERVICES:
        return <CollectBusinessServicesStep />;
      case RegistrationStepEnum.COLLECT_BUSINESS_SCHEDULES:
        return <CollectBusinessSchedulesStep />;
      case RegistrationStepEnum.COLLECT_BUSINESS_HAS_EMPLOYEES:
        return <CollectBusinessHasEmployeesStep />;
      case RegistrationStepEnum.COLLECT_BUSINESS_VALIDATION:
        return <CollectBusinessValidationStep />;
      default:
        return null;
    }
  }, [step]);

  return <Box>{stepContent}</Box>;
}
