"use client";

import { Box, Button, Divider, Stack } from "@mui/material";
import React from "react";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import UploadVideoDescription from "./UploadVideoDescription";
import UploadVideoProducts from "./UploadVideoProducts";
import UploadVideoServiceDomainSection from "./UploadVideoServiceDomainSection";
import UploadVideoTargetGenderSection from "./UploadVideoTargetGenderSection";
import { Product } from "@/ts/models/booking/product/Product";
import { GenderTypeEnum } from "@/ts/enums/GenderTypeEnum";

type UploadVideoMobileDetailsStepProps = {
  description: string;
  videoPreview: string | null;
  selectedProducts: Product[];
  serviceDomainId: number | null;
  targetGender: GenderTypeEnum;
  isUploading: boolean;
  onBack: () => void;
  onDescriptionChange: (d: string) => void;
  onOpenProducts: () => void;
  onRemoveProduct: (product: Product) => void;
  onServiceDomainChange: (serviceDomainId: number | null) => void;
  onTargetGenderChange: (gender: GenderTypeEnum) => void;
  onUpload: () => void;
};

const UploadVideoMobileDetailsStep = ({
  description,
  videoPreview,
  selectedProducts,
  serviceDomainId,
  targetGender,
  isUploading,
  onBack,
  onDescriptionChange,
  onOpenProducts,
  onRemoveProduct,
  onServiceDomainChange,
  onTargetGenderChange,
  onUpload,
}: UploadVideoMobileDetailsStepProps) => {
  return (
    <Stack sx={styles.page}>
      <HeaderMobile
        title="Creează postare"
        displayDivider={false}
        onBack={() => {
          if (!isUploading) onBack();
        }}
      />

      <Box sx={styles.content}>
        <UploadVideoDescription
          description={description}
          onDescriptionChange={onDescriptionChange}
          thumbnailSrc={videoPreview}
        />

        <UploadVideoServiceDomainSection
          selectedServiceDomainId={serviceDomainId}
          onSelect={onServiceDomainChange}
        />

        <UploadVideoTargetGenderSection
          value={targetGender}
          onChange={onTargetGenderChange}
        />

        <UploadVideoProducts
          selectedProducts={selectedProducts}
          onOpenProducts={onOpenProducts}
          onRemoveProduct={onRemoveProduct}
        />
      </Box>

      <Box sx={styles.actions}>
        <Divider sx={{ mb: 2, opacity: 0.6 }} />

        <Button
          onClick={onUpload}
          variant="contained"
          fullWidth
          disableElevation
          disabled={isUploading}
          loading={isUploading}
        >
          Postează
        </Button>
      </Box>
    </Stack>
  );
};

export default UploadVideoMobileDetailsStep;

const styles = {
  page: { height: "100%" },
  content: {
    flex: 1,
    overflowY: "auto",
    px: 2.5,
    pt: 1,
    pb: 1,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  actions: { px: 1.5, pb: 1.5, pt: 0 },
};
