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
import { useSession } from "next-auth/react";

const steps = ["Angajat", "Profesia", "Trimite"];

type EmploymentRequestsModalProps = {
  open: boolean;
  handleClose: () => void;
};

export default function EmploymentRequestsModal({
  open,
  handleClose,
}: EmploymentRequestsModalProps) {
  const { data: session } = useSession();
  const [acknowledged, setAcknowledged] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedProfessionId, setSelectedProfessionId] = useState<
    number | null
  >(null);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleResetAndClose = () => {
    setStepIndex(0);
    setSelectedUserId(null);
    setSelectedProfessionId(null);
    setAcknowledged(false);

    setSearch("");
    setDebouncedSearch("");
    handleClose();
  };

  const isFirstStep = stepIndex === 0;
  const isSecondStep = stepIndex === 1;
  const isThirdStep = stepIndex === 2;

  const { mutate: createEmploymentRequest, isPending } = useMutate({
    key: ["create-employment-request"],
    url: "/api/booking/employment-requests",
    options: {
      onSuccess: () => {
        handleResetAndClose();
      },
    },
  });

  const { data: professions, isLoading: isLoadingProfessions } = useCustomQuery<
    Profession[]
  >({
    key: ["get-professions-by-business-type"],
    url: `/api/nomenclatures/business-types/${session?.business_type_id}/professions`,
    options: { enabled: isSecondStep && open },
  });

  const { data: consent, isLoading: isLoadingConsent } =
    useCustomQuery<Consent>({
      key: ["get-consent"],
      url: "/api/booking/employment-requests/consent",
      params: { consentName: ConsentEnum.EMPLOYMENT_REQUESTS_INITIATION },
      options: { enabled: isThirdStep && open },
    });

  const disabledNextStep =
    (isNull(selectedUserId) && isFirstStep) ||
    (isNull(selectedProfessionId) && isSecondStep);

  const actions: ActionButtonType[] = [
    ...(!isFirstStep
      ? [
          {
            title: "Înapoi",
            props: {
              onClick: () => setStepIndex((prev) => prev - 1),
              variant: "outlined" as const,
              color: "secondary" as const,
              disabled: isPending,
            },
          },
        ]
      : []),
    ...(!isThirdStep
      ? [
          {
            title: "Pasul următor",
            props: {
              onClick: () => setStepIndex((prev) => prev + 1),
              disabled: disabledNextStep,
            },
          },
        ]
      : []),
    ...(isThirdStep
      ? [
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
          },
        ]
      : []),
  ];

  const stepContent = useMemo(() => {
    switch (stepIndex) {
      case 0:
        return (
          <EmploymentRequestsStepOne
            selectedUserId={selectedUserId}
            onSelectUserId={setSelectedUserId}
            search={search}
            setSearch={setSearch}
            debouncedSearch={debouncedSearch}
            setDebouncedSearch={setDebouncedSearch}
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
  }, [
    stepIndex,
    selectedUserId,
    selectedProfessionId,
    professions,
    isLoadingProfessions,
    consent,
    isLoadingConsent,
    acknowledged,
    search,
    debouncedSearch,
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
