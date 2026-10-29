"use client";

import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { alpha, Theme } from "@mui/material/styles";
import React, { ChangeEvent, RefObject, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import UploadIcon from "@mui/icons-material/Upload";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import ForceDarkChrome from "@/components/core/ForceDarkChrome";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <Box sx={styles.page}>
      <ForceDarkChrome />

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
          <Box sx={styles.videoWrapper} onClick={handleTogglePlay}>
            <video
              ref={videoRef}
              src={videoPreview}
              loop
              autoPlay
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {!isPlaying && (
              <Box sx={styles.playOverlay}>
                <PlayArrowRoundedIcon sx={styles.playIcon} />
              </Box>
            )}
          </Box>
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
        {videoPreview ? (
          <Stack direction="row" gap={1.5}>
            <Button
              variant="contained"
              color="neutral"
              disableElevation
              fullWidth
              startIcon={<UploadIcon />}
              onClick={onSelectVideo}
            >
              Schimbă
            </Button>

            <Button
              variant="contained"
              disableElevation
              fullWidth
              onClick={onNext}
            >
              Mai departe
            </Button>
          </Stack>
        ) : (
          <Button
            variant="contained"
            disableElevation
            fullWidth
            startIcon={<UploadIcon />}
            onClick={onSelectVideo}
          >
            Selectează un video
          </Button>
        )}
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
  videoWrapper: {
    position: "relative" as const,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    "& video": { WebkitTapHighlightColor: "transparent" },
  },
  playOverlay: {
    position: "absolute" as const,
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: { fontSize: 74, color: "common.white", opacity: 0.85 },
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
};
