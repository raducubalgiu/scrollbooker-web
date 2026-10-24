"use client";

import { Box, Button, Divider, IconButton, Stack } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadVideoDescription from "./UploadVideoDescription";
import UploadVideoProducts from "./UploadVideoProducts";
import ProgressWithFeedback from "@/components/cutomized/ProgressWithFeedback/ProgressWithFeedback";
import { Product } from "@/ts/models/booking/product/Product";

type UploadVideoMobileDetailsStepProps = {
  description: string;
  selectedProducts: Product[];
  isUploading: boolean;
  uploadProgress: number;
  onBack: () => void;
  onDescriptionChange: (d: string) => void;
  onOpenProducts: () => void;
  onRemoveProduct: (product: Product) => void;
  onUpload: () => void;
};

const UploadVideoMobileDetailsStep = ({
  description,
  selectedProducts,
  isUploading,
  uploadProgress,
  onBack,
  onDescriptionChange,
  onOpenProducts,
  onRemoveProduct,
  onUpload,
}: UploadVideoMobileDetailsStepProps) => {
  return (
    <Stack sx={styles.page}>
      <Stack direction="row" alignItems="center" gap={0.5} sx={styles.header}>
        <IconButton onClick={onBack} disabled={isUploading}>
          <ArrowBackIcon />
        </IconButton>
      </Stack>

      <Box sx={styles.content}>
        <UploadVideoDescription
          description={description}
          onDescriptionChange={onDescriptionChange}
        />

        <UploadVideoProducts
          selectedProducts={selectedProducts}
          onOpenProducts={onOpenProducts}
          onRemoveProduct={onRemoveProduct}
        />
      </Box>

      <Box sx={styles.actions}>
        {isUploading && (
          <Box sx={{ mb: 2 }}>
            <ProgressWithFeedback progress={uploadProgress} />
          </Box>
        )}

        <Divider sx={{ mb: 2, opacity: 0.6 }} />

        <Button
          onClick={onUpload}
          variant="contained"
          fullWidth
          disableElevation
          disabled={isUploading}
          sx={styles.button}
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
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    bgcolor: "background.default",
    px: 1,
    py: 1,
  },
  content: {
    flex: 1,
    overflowY: "auto",
    px: 2.5,
    pt: 1,
    pb: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  actions: { px: 2.5, pb: 2.5, pt: 0 },
  button: {
    p: 1.8,
    fontWeight: 600,
    textTransform: "none" as const,
    fontSize: "1rem",
  },
};
