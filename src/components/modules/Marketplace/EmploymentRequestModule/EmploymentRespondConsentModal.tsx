"use client";

import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import ConsentLayout from "@/components/cutomized/MainLayout/ConsentLayout";
import { useCustomQuery } from "@/hooks/useHttp";
import { Consent } from "@/ts/models/nomenclatures/consent/Consent";
import { ConsentEnum } from "@/ts/models/nomenclatures/consent/ConsentEnum";
import React, { useState } from "react";

type EmploymentRespondConsentModalProps = {
  open: boolean;
  isLoadingAccept: boolean;
  onClose: () => void;
  onAccept: () => void;
};

export default function EmploymentRespondConsentModal({
  open,
  isLoadingAccept,
  onClose,
  onAccept,
}: EmploymentRespondConsentModalProps) {
  const [acknowledged, setAcknowledged] = useState(false);

  const { data: consent, isLoading } = useCustomQuery<Consent>({
    key: ["get-consent"],
    url: `/api/nomenclatures/consents/name/${ConsentEnum.EMPLOYMENT_REQUESTS_ACCEPTANCE}`,
    options: { enabled: open },
  });

  const sections = consent?.text?.split(/\n(?=\d+\. )/);

  const actions: ActionButtonType[] = [
    {
      title: "Renunță",
      props: {
        variant: "outlined",
        color: "secondary",
        onClick: onClose,
        disabled: isLoadingAccept,
        loading: isLoadingAccept,
      },
    },
    {
      title: "Acceptă",
      props: {
        onClick: onAccept,
        disabled: isLoading,
        loading: isLoadingAccept,
      },
    },
  ];

  return (
    <Modal
      title="Termeni și condiții"
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      actions={actions}
    >
      <ConsentLayout
        mainTitle="Acceptare cerere angajare"
        sections={sections ?? []}
        acknowledged={acknowledged}
        setAcknowledged={setAcknowledged}
        isLoading={isLoading}
      />
    </Modal>
  );
}
