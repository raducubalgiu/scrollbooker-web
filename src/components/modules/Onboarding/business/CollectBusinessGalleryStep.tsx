"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import BusinessOnboardingSectionLayout from "../BusinessOnboardingSectionLayout";
import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCollectBusinessGalleryMutation } from "@/controllers/onboarding/onboarding.controller";
import { useTranslations } from "next-intl";

type GalleryItem = {
  id: string;
  src: string | null;
  file?: File;
};

const MAX_IMAGES = 5;

const CollectBusinessGalleryStep = () => {
  const t = useTranslations("onboarding.gallery");
  const router = useRouter();
  const { update } = useSession();

  const [items, setItems] = useState<GalleryItem[]>(() => {
    return Array.from({ length: MAX_IMAGES }).map((_, idx) => ({
      id: `empty-${idx}-${Date.now()}`,
      src: null,
    }));
  });

  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array(MAX_IMAGES).fill(null)
  );

  useEffect(() => {
    return () => {
      items.forEach((it) => {
        if (it?.src && it.src.startsWith("blob:")) {
          URL.revokeObjectURL(it.src);
        }
      });
    };
  }, [items]);

  const { mutate: handleUpload, isPending: isPendingGallery } =
    useCollectBusinessGalleryMutation();

  const onFileSelected = (index: number, file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error(t("invalidFileType"));
      return;
    }

    setItems((prev) => {
      const copy = [...prev];
      const prevItem = copy[index];

      if (prevItem?.src && prevItem.src.startsWith("blob:")) {
        URL.revokeObjectURL(prevItem.src);
      }

      const objectUrl = URL.createObjectURL(file);
      copy[index] = { id: `file-${index}-${Date.now()}`, src: objectUrl, file };
      return copy;
    });
  };

  const handleRemove = (index: number) => {
    setItems((prev) => {
      const copy = [...prev];
      if (copy[index]?.src && copy[index].src?.startsWith("blob:")) {
        URL.revokeObjectURL(copy[index].src as string);
      }
      copy[index] = { id: `empty-${index}-${Date.now()}`, src: null };
      return copy;
    });
  };

  const onSave = () => {
    const filesToUpload = items
      .filter((it) => it.file)
      .map((it) => it.file as File);

    if (filesToUpload.length === 0) {
      toast.warning(t("minPhotosWarning"));
      return;
    }

    handleUpload(filesToUpload, {
      onSuccess: async (data) => {
        toast.success(t("success"));
        await update({
          is_validated: data.is_validated,
          registration_step: data.registration_step,
        });

        router.refresh();
      },
      onError: (err: unknown) => {
        const axiosError = err as { response?: { data?: { detail?: string } } };
        console.error("Upload failed:", axiosError?.response?.data || err);
        toast.error(axiosError?.response?.data?.detail || t("errorFallback"));
      },
    });
  };

  return (
    <BusinessOnboardingSectionLayout
      title={t("title")}
      description={t("subtitle")}
      isLoading={isPendingGallery}
      isDisabled={isPendingGallery || items.filter((it) => it.src).length === 0}
      onClick={onSave}
    >
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          },
        }}
      >
        {items.map((it, idx) => (
          <Box key={it.id}>
            <Card
              variant="outlined"
              sx={{
                height: 220,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                transition: "all 0.2s",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: it.src ? "transparent" : "action.hover",
                  cursor: "pointer",
                }}
                onClick={() => inputRefs.current[idx]?.click()}
              >
                {it.src ? (
                  <img
                    src={it.src}
                    alt={`preview-${idx}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Stack
                    alignItems="center"
                    spacing={1}
                    sx={{ color: "text.disabled" }}
                  >
                    <AddPhotoAlternateIcon fontSize="large" />
                    <Typography variant="caption">{t("uploadHint")}</Typography>
                  </Stack>
                )}

                <input
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    onFileSelected(idx, f ?? null);
                    e.target.value = "";
                  }}
                />

                {it.src && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(idx);
                    }}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                      "&:hover": { bgcolor: "error.main" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </BusinessOnboardingSectionLayout>
  );
};

export default memo(CollectBusinessGalleryStep);
