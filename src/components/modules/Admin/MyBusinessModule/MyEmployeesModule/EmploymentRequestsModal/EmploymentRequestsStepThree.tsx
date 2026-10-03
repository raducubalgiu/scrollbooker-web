"use client";

import ConsentLayout from "@/components/cutomized/MainLayout/ConsentLayout";
import { Consent } from "@/ts/models/nomenclatures/consent/Consent";

type EmploymentRequestsStepThreeProps = {
  consent: Consent | undefined;
  isLoading: boolean;
  acknowledged: boolean;
  setAcknowledged: (e: boolean) => void;
};

export default function EmploymentRequestsStepThree({
  consent,
  isLoading,
  acknowledged,
  setAcknowledged,
}: EmploymentRequestsStepThreeProps) {
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
