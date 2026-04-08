"use client";

import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import React, { useMemo, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box } from "@mui/material";
import { isNull } from "lodash";
import EmploymentRequestsStepOne from "./EmploymentRequestsStepOne";
import EmploymentRequestsStepTwo from "./EmploymentRequestsStepTwo";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import EmploymentRequestsStepThree from "./EmploymentRequestsStepThree";
import { ConsentEnum } from "@/ts/models/nomenclatures/consent/ConsentEnum";
import { Profession } from "@/ts/models/nomenclatures/profession/ProfessionType";
import { Consent } from "@/ts/models/nomenclatures/consent/Consent";

const steps = ["Angajat", "Profesia", "Trimite"];

type EmploymentRequestsModalProps = {
  open: boolean;
  handleClose: () => void;
};

export default function EmploymentRequestsModal({
  open,
  handleClose,
}: EmploymentRequestsModalProps) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedProfessionId, setSelectedProfessionId] = useState<
    number | null
  >(null);
  const [stepIndex, setStepIndex] = useState<number>(0);

  // Funcție pentru a reseta totul la închidere (reluarea procesului)
  const handleResetAndClose = () => {
    setStepIndex(0);
    setSelectedUserId(null);
    setSelectedProfessionId(null);
    setAcknowledged(false);
    handleClose();
  };

  const isFirstStep = stepIndex === 0;
  const isSecondStep = stepIndex === 1;
  const isThirdStep = stepIndex === 2;

  const { mutate: createEmploymentRequest, isPending } = useMutate({
    key: ["create-employment-request"],
    url: "/api/employment-requests",
    options: {
      onSuccess: () => {
        handleResetAndClose();
      },
    },
  });

  const { data: professions, isLoading: isLoadingProfessions } = useCustomQuery<
    Profession[]
  >({
    key: ["get-professions"],
    url: "/api/employment-requests/professions",
    options: { enabled: isSecondStep && open },
  });

  const { data: consent, isLoading: isLoadingConsent } =
    useCustomQuery<Consent>({
      key: ["get-consent"],
      url: "/api/employment-requests/consent",
      params: { consentName: ConsentEnum.EMPLOYMENT_REQUESTS_INITIATION },
      options: { enabled: isThirdStep && open },
    });

  const disabledNextStep =
    (isNull(selectedUserId) && isFirstStep) ||
    (isNull(selectedProfessionId) && isSecondStep);

  const actions: ActionButtonType[] = [
    {
      title: "Înapoi",
      props: {
        onClick: () => setStepIndex((prev) => prev - 1),
        variant: "outlined",
        color: "secondary",
        disabled: isPending,
      },
      hidden: isFirstStep,
    },
    {
      title: "Pasul următor",
      props: {
        onClick: () => setStepIndex((prev) => prev + 1),
        disabled: disabledNextStep,
      },
      hidden: isThirdStep,
    },
    {
      title: "Trimite cererea",
      props: {
        onClick: () =>
          createEmploymentRequest({
            employee_id: selectedUserId,
            consent_id: consent?.id,
            profession_id: selectedProfessionId,
          }),
        disabled: !acknowledged || isPending,
        loading: isPending,
      },
      hidden: !isThirdStep,
    },
  ];

  const stepContent = useMemo(() => {
    switch (stepIndex) {
      case 0:
        return (
          <EmploymentRequestsStepOne
            selectedUserId={selectedUserId}
            onSelectUserId={setSelectedUserId}
          />
        );
      case 1:
        return (
          <EmploymentRequestsStepTwo
            selectedProfessionId={selectedProfessionId}
            onSelectProfessionId={setSelectedProfessionId}
            professions={professions}
            isLoading={isLoadingProfessions}
          />
        );
      case 2:
        return (
          <EmploymentRequestsStepThree
            consent={consent}
            isLoading={isLoadingConsent}
            acknowledged={acknowledged}
            setAcknowledged={setAcknowledged}
          />
        );
      default:
        return null;
    }
    // Adăugat toate dependințele necesare pentru re-render
  }, [
    stepIndex,
    selectedUserId,
    selectedProfessionId,
    professions,
    isLoadingProfessions,
    consent,
    isLoadingConsent,
    acknowledged,
  ]);

  return (
    <Modal
      title="Trimite o cerere de angajare"
      open={open}
      handleClose={handleResetAndClose}
      actions={actions}
    >
      <Box sx={{ minWidth: 700, py: 2 }}>
        <Stepper activeStep={stepIndex} alternativeLabel sx={styles.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 1.5 }}>{stepContent}</Box>
      </Box>
    </Modal>
  );
}

const styles = {
  stepper: {
    "& .MuiStepIcon-root": {
      fontSize: "2rem",
      color: "secondary.main",
      fontWeight: 500,
      "&.Mui-active": { color: "secondary.main" },
      "&.Mui-completed": { color: "primary.main" },
    },
    "& .MuiStepLabel-label": {
      fontSize: "1rem",
      mt: 1.5,
      "&.Mui-active": { fontWeight: "bold", color: "primary.main" },
      "&.Mui-completed": { color: "text.secondary" },
    },
  },
};
