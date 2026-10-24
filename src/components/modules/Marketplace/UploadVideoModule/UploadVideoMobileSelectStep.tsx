"use client";

import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { alpha, Theme } from "@mui/material/styles";
import React, { ChangeEvent, RefObject } from "react";
import CloseIcon from "@mui/icons-material/Close";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";

type UploadVideoMobileSelectStepProps = {
  videoPreview: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onVideoChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectVideo: () => void;
  onNext: () => void;
  onBack: () => void;
};

const UploadVideoMobileSelectStep = ({
  videoPreview,
  fileInputRef,
  onVideoChange,
  onSelectVideo,
  onNext,
  onBack,
}: UploadVideoMobileSelectStepProps) => {
  return (
    <Box sx={styles.page}>
      <input
        type="file"
        accept="video/*"
        hidden
        ref={fileInputRef}
        onChange={onVideoChange}
      />

      <Box sx={styles.preview}>
        <Box sx={styles.header}>
          <IconButton onClick={onBack} sx={styles.backButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        {videoPreview ? (
          <video
            src={videoPreview}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            controls
          />
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            gap={1.5}
            sx={{ width: "100%", height: "100%" }}
          >
            <VideoLibraryOutlinedIcon sx={styles.placeholderIcon} />
            <Typography sx={styles.placeholderText}>
              Alege un videoclip din galeria telefonului pentru a începe o
              postare nouă
            </Typography>
          </Stack>
        )}
      </Box>

      <Box sx={styles.actions}>
        <Button
          variant="contained"
          disableElevation
          fullWidth
          onClick={videoPreview ? onNext : onSelectVideo}
          sx={styles.primaryButton}
        >
          {videoPreview ? "Mai departe" : "Selectează un video"}
        </Button>
      </Box>
    </Box>
  );
};

export default UploadVideoMobileSelectStep;

const styles = {
  page: {
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
    width: "100%",
    bgcolor: "common.black",
  },
  preview: {
    position: "relative",
    flex: 1,
    minHeight: 0,
    width: "100%",
    overflow: "hidden",
    bgcolor: "common.black",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
  },
  placeholderIcon: { fontSize: 32, color: "common.white" },
  placeholderText: (theme: Theme) => ({
    color: alpha(theme.palette.common.white, 0.7),
    textAlign: "center" as const,
    maxWidth: 260,
  }),
  header: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    pt: "calc(12px + env(safe-area-inset-top))",
    px: 1,
  },
  backButton: (theme: Theme) => ({
    color: "common.white",
    bgcolor: alpha(theme.palette.common.black, 0.35),
    "&:hover": { bgcolor: alpha(theme.palette.common.black, 0.5) },
  }),
  actions: {
    flexShrink: 0,
    px: 2,
    pt: 1,
    pb: "calc(10px + env(safe-area-inset-bottom))",
    bgcolor: "common.black",
  },
  primaryButton: { p: 1.6, textTransform: "none" as const, fontWeight: 600 },
};
