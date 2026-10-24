"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useUploadVideoFlow } from "./useUploadVideoFlow";
import UploadVideoMobileSelectStep from "./UploadVideoMobileSelectStep";
import UploadVideoMobileDetailsStep from "./UploadVideoMobileDetailsStep";
import UploadVideoProductsPicker from "./products/UploadVideoProductsPicker";

type UploadStep = "select" | "details";

const UploadVideoMobileModule = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { goBack } = useAppNavigation();

  const step: UploadStep =
    searchParams.get("step") === "details" ? "details" : "select";

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

  useEffect(() => {
    if (step === "details" && !selectedVideo) {
      router.replace(pathname);
    }
  }, [step, selectedVideo, router, pathname]);

  const goToDetails = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", "details");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <UploadVideoProductsPicker
        selectedProducts={selectedProducts}
        onAddProducts={handleSelectProducts}
        open={openProducts}
        onClose={handleCloseProducts}
      />

      {step === "select" ? (
        <UploadVideoMobileSelectStep
          videoPreview={videoPreview}
          fileInputRef={fileInputRef}
          onVideoChange={handleVideoChange}
          onSelectVideo={handleContainerClick}
          onNext={goToDetails}
          onBack={() => goBack()}
        />
      ) : (
        <UploadVideoMobileDetailsStep
          description={description}
          videoPreview={videoPreview}
          selectedProducts={selectedProducts}
          serviceDomainId={serviceDomainId}
          targetGender={targetGender}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          onBack={() => goBack()}
          onDescriptionChange={handleDescription}
          onOpenProducts={handleOpenProducts}
          onRemoveProduct={handleRemoveProduct}
          onServiceDomainChange={setServiceDomainId}
          onTargetGenderChange={setTargetGender}
          onUpload={handleUpload}
        />
      )}
    </>
  );
};

export default UploadVideoMobileModule;
