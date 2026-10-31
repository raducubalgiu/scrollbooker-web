"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  PROBLEM_MAX_PHOTO_BYTES,
  PROBLEM_MAX_PHOTOS,
  PROBLEM_PHOTO_TYPES,
} from "@/controllers/nomenclature/problem.controller";

type ProblemPhotosPickerProps = {
  photos: File[];
  disabled?: boolean;
  onChange: (photos: File[]) => void;
  onError: (message: string | null) => void;
};

const ProblemPhotosPicker = ({
  photos,
  disabled = false,
  onChange,
  onError,
}: ProblemPhotosPickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const previews = useMemo(
    () => photos.map((photo) => URL.createObjectURL(photo)),
    [photos],
  );

  useEffect(
    () => () => previews.forEach((preview) => URL.revokeObjectURL(preview)),
    [previews],
  );

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";

    const accepted = selected.filter(
      (file) =>
        PROBLEM_PHOTO_TYPES.includes(file.type) &&
        file.size <= PROBLEM_MAX_PHOTO_BYTES,
    );
    const freeSlots = PROBLEM_MAX_PHOTOS - photos.length;

    if (accepted.length < selected.length) {
      onError(
        "Poți adăuga doar imagini JPG, PNG, WebP sau AVIF de maximum 8 MB.",
      );
    } else if (accepted.length > freeSlots) {
      onError(`Poți atașa maximum ${PROBLEM_MAX_PHOTOS} fotografii.`);
    } else {
      onError(null);
    }

    onChange([...photos, ...accepted.slice(0, freeSlots)]);
  };

  const handleRemove = (index: number) => {
    onError(null);
    onChange(photos.filter((_, photoIndex) => photoIndex !== index));
  };

  return (
    <Stack spacing={1}>
      <Typography fontWeight={600}>Capturi de ecran (opțional)</Typography>
      <Typography variant="body2" color="text.secondary">
        Maximum {PROBLEM_MAX_PHOTOS} fotografii.
      </Typography>

      <Stack direction="row" spacing={1.5} sx={{ pt: 0.5 }}>
        {previews.map((preview, index) => (
          <Box key={preview} sx={styles.tile}>
            <Box
              component="img"
              src={preview}
              alt={`Captura ${index + 1}`}
              sx={styles.image}
            />
            <IconButton
              size="small"
              aria-label={`Elimină captura ${index + 1}`}
              onClick={() => handleRemove(index)}
              disabled={disabled}
              sx={styles.removeButton}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}

        {photos.length < PROBLEM_MAX_PHOTOS && (
          <Box
            component="button"
            type="button"
            aria-label="Adaugă o captură de ecran"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            sx={{ ...styles.tile, ...styles.addTile }}
          >
            <AddPhotoAlternateOutlinedIcon sx={{ color: "text.secondary" }} />
          </Box>
        )}
      </Stack>

      <input
        ref={inputRef}
        type="file"
        accept={PROBLEM_PHOTO_TYPES.join(",")}
        multiple
        hidden
        onChange={handleFiles}
      />
    </Stack>
  );
};

export default ProblemPhotosPicker;

const styles = {
  tile: {
    position: "relative",
    width: 88,
    height: 88,
    borderRadius: 2,
    overflow: "hidden",
    flexShrink: 0,
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "background.default",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    p: 0.25,
    bgcolor: "background.paper",
    "&:hover": { bgcolor: "background.paper" },
  },
  addTile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    cursor: "pointer",
    p: 0,
    "&:disabled": { cursor: "default", opacity: 0.6 },
  },
};
