"use client";

import { Box, Button, Stack } from "@mui/material";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import UploadIcon from "@mui/icons-material/Upload";
import UploadVideoSidebar from "./UploadVideoSidebar";

const UploadVideoModule = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleContainerClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const handleDescription = useCallback((d: string) => {
    setDescription(d);
  }, []);

  return (
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
              {videoPreview ? (
                <video
                  src={videoPreview}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  controls
                />
              ) : (
                <ControlPointOutlinedIcon
                  sx={{ width: 100, height: 100, color: "divider" }}
                />
              )}
            </Stack>
          </Box>

          <Button
            variant="outlined"
            onClick={handleContainerClick}
            startIcon={<UploadIcon />}
            fullWidth
            sx={{
              p: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {videoPreview ? "Schimbă videoclipul" : "Selectează video"}
          </Button>
        </Stack>
      </Box>

      <UploadVideoSidebar
        currentStep={currentStep}
        description={description}
        onSetCurrentStep={handleStep}
        onDescriptionChange={handleDescription}
      />
    </Box>
  );
};

export default UploadVideoModule;

const styles = {
  container: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    gap: 3,
    width: "100%",
    height: "calc(100vh - 40px)",
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
    bgcolor: "background.default",
  },
} as const;
