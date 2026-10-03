"use client";

import ConsentLayout from "@/components/cutomized/MainLayout/ConsentLayout";
import { Consent } from "@/ts/models/nomenclatures/consent/Consent";

type EmploymentAcceptTermsStepProps = {
  consent: Consent | undefined;
  isLoading: boolean;
  acknowledged: boolean;
  setAcknowledged: (e: boolean) => void;
};

export default function EmploymentAcceptTermsStep({
  consent,
  isLoading,
  acknowledged,
  setAcknowledged,
}: EmploymentAcceptTermsStepProps) {
  const sections = consent?.text?.split(/\n(?=\d+\. )/);

  return (
    <ConsentLayout
      mainTitle="Confirmare cerere angajare"
      sections={sections ?? []}
      acknowledged={acknowledged}
      setAcknowledged={setAcknowledged}
      isLoading={isLoading}
    />
  );
}
