"use client";

import { Box, Button, Stack } from "@mui/material";
import React from "react";
import UploadIcon from "@mui/icons-material/Upload";
import UploadVideoSidebar from "./UploadVideoSidebar";
import ProgressWithFeedback from "@/components/cutomized/ProgressWithFeedback/ProgressWithFeedback";
import ProductsSelectionModal from "./products/ProductsSelectionModal";
import { useUploadVideoFlow } from "./useUploadVideoFlow";

const UploadVideoDesktopModule = () => {
  const {
    selectedVideo,
    videoPreview,
    description,
    isUploading,
    uploadProgress,
    fileInputRef,
    openProducts,
    selectedProducts,
    serviceDomainId,
    setServiceDomainId,
    targetGender,
    setTargetGender,
    handleOpenProducts,
    handleCloseProducts,
    handleVideoChange,
    handleContainerClick,
    handleDescription,
    handleUpload,
    handleSelectProducts,
    handleRemoveProduct,
  } = useUploadVideoFlow();

  return (
    <>
      <ProductsSelectionModal
        selectedProducts={selectedProducts}
        onAddProducts={handleSelectProducts}
        open={openProducts}
        onClose={handleCloseProducts}
      />

      <Box sx={styles.container}>
        <Box sx={styles.leftSection}>
          <input
            type="file"
            accept="video/*"
            hidden
            ref={fileInputRef}
            onChange={handleVideoChange}
          />

          <Stack
            spacing={2}
            alignItems="center"
            sx={{ width: "100%", height: "100%" }}
          >
            {isUploading && <ProgressWithFeedback progress={uploadProgress} />}

            <Box
              sx={{
                ...styles.videoContainer,
                cursor: "pointer",
                flex: 1,
                width: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ width: "100%", height: "100%" }}
              >
                {videoPreview && (
                  <video
                    src={videoPreview}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    controls
                  />
                )}
              </Stack>
            </Box>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleContainerClick}
              startIcon={<UploadIcon />}
              fullWidth
              sx={{
                p: 1.5,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {videoPreview ? "Schimbă videoclipul" : "Selectează video"}
            </Button>
          </Stack>
        </Box>

        <UploadVideoSidebar
          selectedProducts={selectedProducts}
          description={description}
          serviceDomainId={serviceDomainId}
          targetGender={targetGender}
          onHandleOpenProducts={handleOpenProducts}
          onDescriptionChange={handleDescription}
          onHandleUpload={handleUpload}
          onRemoveProduct={handleRemoveProduct}
          onServiceDomainChange={setServiceDomainId}
          onTargetGenderChange={setTargetGender}
          isDisabled={isUploading || !selectedVideo}
        />
      </Box>
    </>
  );
};

export default UploadVideoDesktopModule;

const styles = {
  container: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    gap: 3,
    width: "100%",
    height: "calc(100vh - 40px)",
    mt: "20px",
    mx: "auto",
    px: 3,
    overflow: "hidden",
  },
  leftSection: {
    flex: "0 0 auto",
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: 2.5,
  },
  videoContainer: {
    position: "relative",
    height: "100%",
    aspectRatio: "9 / 16",
    borderRadius: 4,
    overflow: "hidden",
    bgcolor: "background.paper",
  },
} as const;
