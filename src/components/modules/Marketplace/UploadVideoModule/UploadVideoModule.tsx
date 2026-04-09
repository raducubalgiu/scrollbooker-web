"use client";

import * as tus from "tus-js-client";
import { Box, Button, Stack } from "@mui/material";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import UploadVideoSidebar from "./UploadVideoSidebar";
import { PostCreate } from "@/ts/models/social/PostCreate";
import ProgressWithFeedback from "@/components/cutomized/ProgressWithFeedback/ProgressWithFeedback";

const UploadVideoModule = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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

  const handleDescription = useCallback((d: string) => {
    setDescription(d);
  }, []);

  const handleUpload = async () => {
    if (!selectedVideo || isUploading) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const initResponse = await fetch("/api/posts/upload-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uploadLength: selectedVideo.size,
          metadata: {
            name: selectedVideo.name,
            filename: selectedVideo.name,
            filetype: selectedVideo.type || "application/octet-stream",
          },
        }),
      });

      if (!initResponse.ok) {
        const errorPayload = await initResponse.json().catch(() => null);
        throw new Error(
          errorPayload?.error ||
            "Nu s-a putut genera URL-ul de upload de la backend."
        );
      }

      const initData: { uploadUrl: string; uid: string } =
        await initResponse.json();

      if (!initData.uploadUrl || !initData.uid) {
        throw new Error(
          "Cloudflare Stream didn't returned the uploadUrl / uid"
        );
      }

      console.log("INIT DATA!!!", initData);

      const upload = new tus.Upload(selectedVideo, {
        uploadUrl: initData.uploadUrl,
        metadata: {
          filename: selectedVideo.name,
          filetype: selectedVideo.type || "application/octet-stream",
        },

        uploadSize: selectedVideo.size,
        retryDelays: [0, 1000, 3000, 5000],
        removeFingerprintOnSuccess: true,

        onError: (error) => {
          console.error("Upload Error:", error);
          alert(`Eroare la încărcare: ${error.message}`);
          setIsUploading(false);
        },

        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          setUploadProgress(Number(percentage));
        },

        onSuccess: async () => {
          try {
            const postData: PostCreate = {
              description,
              provider: "cloudflare_stream",
              provider_uid: initData.uid,
              order_index: 0,
              video_review_message: null,
              is_video_review: false,
              rating: null,
              business_or_employee_id: null,
            };

            const saveResponse = await fetch("/api/posts/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(postData),
            });

            if (!saveResponse.ok) {
              const errorPayload = await saveResponse.json().catch(() => null);
              throw new Error(
                errorPayload?.error ||
                  "Eroare la salvarea postării în baza de date."
              );
            }

            setSelectedVideo(null);
            setDescription("");
            setUploadProgress(0);
            setIsUploading(false);

            alert("Video-ul a fost încărcat cu succes.");
          } catch (error) {
            console.error("DB Save Error:", error);
            alert(
              error instanceof Error
                ? error.message
                : "A apărut o eroare la salvarea postării."
            );
            setIsUploading(false);
          }
        },
      });

      upload.start();
    } catch (error) {
      console.error("Setup Error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "A apărut o eroare la inițierea upload-ului."
      );
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

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
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
        description={description}
        onDescriptionChange={handleDescription}
        onHandleUpload={handleUpload}
        isDisabled={isUploading || !selectedVideo}
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
