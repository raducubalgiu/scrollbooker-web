"use client";

import { Box } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import CollectBusinessLocationDescription from "./steps/CollectBusinessLocationDescription";
import { useMutate } from "@/hooks/useHttp";
import { BusinessCreate } from "@/ts/models/booking/business/Business";
import CollectBusinessType from "./steps/CollectBusinessType";
import CollectBusinessAddress from "./steps/CollectBusinessAddress";
import CollectBusinessFooter from "./CollectBusinessFooter";
import CollectBusinessStepper from "./stepper/CollectBusinessStepper";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OnboardingBusinessCreateResponse } from "@/ts/models/onboarding/Onboarding";

export enum BusinessStep {
  BUSINESS_TYPE,
  BUSINESS_LOCATION_DESCRIPTION,
  BUSINESS_ADDRESS,
}

const CollectBusinessStep = () => {
  const router = useRouter();
  const { update } = useSession();
  const [step, setStep] = useState<BusinessStep>(BusinessStep.BUSINESS_TYPE);
  const [addressQuery, setAddressQuery] = useState("");

  const [businessTypeId, setBusinessTypeId] = useState<number | null>(null);
  const [ownerFullName, setOwnerFullName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const { mutate: createBusiness, isPending } = useMutate({
    key: ["create-business"],
    url: "/api/onboarding/collect-business",
    method: "POST",
    options: {
      onSuccess: async (data: OnboardingBusinessCreateResponse) => {
        await update({
          business_id: data.business_id,
          business_type_id: data.business_type_id,
          is_validated: data.onboarding_state.is_validated,
          registration_step: data.onboarding_state.registration_step,
        });

        router.refresh();
      },
    },
  });

  const isFirstStep = step === 0;
  const isLastStep = step === BusinessStep.BUSINESS_ADDRESS;

  const handleNextSubStep = useCallback(() => {
    if (step === BusinessStep.BUSINESS_ADDRESS) {
      if (!selectedPlaceId || !businessTypeId || !ownerFullName.length) {
        return;
      }

      const body: BusinessCreate = {
        description: businessDescription,
        owner_fullname: ownerFullName,
        place_id: selectedPlaceId,
        business_type_id: businessTypeId,
      };
      createBusiness(body);
    } else {
      setStep((prev) => prev + 1);
    }
  }, [
    step,
    selectedPlaceId,
    businessTypeId,
    ownerFullName,
    businessDescription,
    createBusiness,
  ]);

  const handleBackSubStep = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const handleBusinessType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBusinessTypeId(Number(event.target.value));
    },
    []
  );

  const handleOwnerFullName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setOwnerFullName(event.target.value);
    },
    []
  );

  const handleBusinessDescription = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBusinessDescription(event.target.value);
    },
    []
  );

  const handlePlaceId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedPlaceId(event.target.value);
    },
    []
  );

  const handleSetAddressQuery = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddressQuery(e.target.value);
    },
    []
  );

  const stepContent = useMemo(() => {
    switch (step) {
      case BusinessStep.BUSINESS_TYPE:
        return (
          <CollectBusinessType
            businessTypeId={businessTypeId}
            onHandleBusinessTypeId={handleBusinessType}
          />
        );
      case BusinessStep.BUSINESS_LOCATION_DESCRIPTION:
        return (
          <CollectBusinessLocationDescription
            ownerFullName={ownerFullName}
            onHandleOwnerFullName={handleOwnerFullName}
            businessDescription={businessDescription}
            onHandleBusinessDescription={handleBusinessDescription}
          />
        );
      case BusinessStep.BUSINESS_ADDRESS:
        return (
          <CollectBusinessAddress
            addressQuery={addressQuery}
            onSetQuery={handleSetAddressQuery}
            selectedPlaceId={selectedPlaceId}
            onSelectPlaceId={handlePlaceId}
          />
        );
    }
  }, [
    step,
    businessTypeId,
    ownerFullName,
    businessDescription,
    selectedPlaceId,
    addressQuery,
  ]);

  return (
    <Box sx={styles.container}>
      <CollectBusinessStepper step={step} />

      <Box sx={styles.stepContent}>{stepContent}</Box>

      <CollectBusinessFooter
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        isLoading={isPending}
        onHandleBack={handleBackSubStep}
        onHandleNext={handleNextSubStep}
      />
    </Box>
  );
};

export default CollectBusinessStep;

const styles = {
  container: { display: "flex", flexDirection: "column", height: "100%" },
  stepContent: { flexGrow: 1, overflowY: "auto", pb: 2.5 },
};
