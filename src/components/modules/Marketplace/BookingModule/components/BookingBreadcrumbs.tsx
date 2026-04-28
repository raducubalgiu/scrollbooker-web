import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";

type BookingBreadcrumbsProps = {
  currentStep: BookingStepEnum;
};

export enum BookingStepEnum {
  SERVICES = 0,
  SPECIALISTS = 1,
  DATE_AND_HOUR = 2,
  CONFIRM = 3,
}

const STEPS = [
  { id: BookingStepEnum.SERVICES, label: "Servicii" },
  { id: BookingStepEnum.SPECIALISTS, label: "Profesioniști" },
  { id: BookingStepEnum.DATE_AND_HOUR, label: "Data și Ora" },
  { id: BookingStepEnum.CONFIRM, label: "Confirmare" },
];

const BookingBreadcrumbs = ({ currentStep }: BookingBreadcrumbsProps) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" separator="›" sx={styles.container}>
      {STEPS.map((step) => {
        const isActive = step.id === currentStep;

        return (
          <Typography
            key={step.id}
            sx={{
              fontSize: 20,
              fontWeight: isActive ? 800 : 500,
              color: isActive ? "text.primary" : "text.secondary",
              opacity: isActive ? 1 : 0.6,
            }}
          >
            {step.label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default BookingBreadcrumbs;

const styles = {
  container: {
    "& .MuiBreadcrumbs-separator": {
      mx: 2,
      fontSize: 22,
      color: "text.disabled",
    },
  },
};
