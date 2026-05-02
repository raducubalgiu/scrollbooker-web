"use client";

import { Container, Stack } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import CollectBusinessType from "./CollectBusinessType";
import CollectBusinessLocationDescription from "./CollectBusinessLocationDescription";
import CollectBusinessAddress from "./CollectBusinessAddress";
import CollectBusinessGallery from "../CollectBusinessGalleryStep";

enum BusinessStep {
  BUSINESS_TYPE,
  BUSINESS_LOCATION_DESCRIPTION,
  BUSINESS_ADDRESS,
  BUSINESS_GALLERY,
}

const CollectBusinessStep = () => {
  const [step, setStep] = useState<BusinessStep>(BusinessStep.BUSINESS_TYPE);
  const [businessTypeId, setBusinessTypeId] = useState<number | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const handleBusinessType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBusinessTypeId(Number(event.target.value));
    },
    []
  );

  const handleBusinessName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBusinessName(event.target.value);
    },
    [businessName]
  );

  const handleBusinessDescription = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBusinessDescription(event.target.value);
    },
    [businessDescription]
  );

  const handlePlaceId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedPlaceId(event.target.value);
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
            onSetStep={() =>
              setStep(BusinessStep.BUSINESS_LOCATION_DESCRIPTION)
            }
          />
        );
      case BusinessStep.BUSINESS_LOCATION_DESCRIPTION:
        return (
          <CollectBusinessLocationDescription
            businessName={businessName}
            onHandleBusinessName={handleBusinessName}
            businessDescription={businessDescription}
            onHandleBusinessDescription={handleBusinessDescription}
            onSetStep={() => setStep(BusinessStep.BUSINESS_ADDRESS)}
          />
        );
      case BusinessStep.BUSINESS_ADDRESS:
        return (
          <CollectBusinessAddress
            selectedPlaceId={selectedPlaceId}
            onSelectPlaceId={handlePlaceId}
            onSetStep={() => setStep(BusinessStep.BUSINESS_GALLERY)}
          />
        );
      case BusinessStep.BUSINESS_GALLERY:
        return <CollectBusinessGallery />;
    }
  }, [
    step,
    businessTypeId,
    businessName,
    businessDescription,
    selectedPlaceId,
  ]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {stepContent}
      </Container>
    </Stack>
  );
};

export default CollectBusinessStep;
