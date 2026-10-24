import { Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";

type UploadVideoDescriptionProps = {
  description: string;
  onDescriptionChange: (s: string) => void;
  thumbnailSrc?: string | null;
};

const UploadVideoDescription = ({
  description,
  onDescriptionChange,
  thumbnailSrc,
}: UploadVideoDescriptionProps) => {
  const hasThumbnail = Boolean(thumbnailSrc);

  return (
    <Box mt={1.5}>
      <Stack direction="row" alignItems="flex-start" gap={2.5}>
        {thumbnailSrc && (
          <Box sx={styles.thumbnail}>
            <video
              src={thumbnailSrc}
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        )}

        <Box
          sx={[styles.rightColumn, hasThumbnail && styles.rightColumnFixedHeight]}
        >
          <Box sx={styles.textFieldWrapper}>
            <TextField
              fullWidth
              multiline
              variant="standard"
              minRows={3}
              maxRows={5}
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Adauga o descriere..."
              slotProps={{
                input: { disableUnderline: true },
                htmlInput: { maxLength: 500 },
              }}
              sx={styles.input}
            />
          </Box>

          <Stack flexDirection="row" justifyContent="flex-end" sx={styles.counterRow}>
            <Typography color="text.secondary" variant="body2">
              {description.length} / 500
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default UploadVideoDescription;

const styles = {
  thumbnail: {
    width: 105,
    height: 140,
    borderRadius: 2.5,
    overflow: "hidden",
    flexShrink: 0,
    bgcolor: "background.paper",
  },
  rightColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
  },
  rightColumnFixedHeight: {
    height: 140,
  },
  textFieldWrapper: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto" as const,
  },
  counterRow: {
    flexShrink: 0,
    mt: 1,
  },
  input: {
    "& .MuiInputBase-root": {
      padding: 0,
    },
    "& .MuiInputBase-input": {
      padding: "0 !important",
      minHeight: "0 !important",
      borderRadius: "0 !important",
      backgroundColor: "transparent !important",
      lineHeight: 1.4,
    },
    "& .MuiInputBase-input:hover": {
      backgroundColor: "transparent !important",
    },
    "& .MuiInputBase-input:focus, & .MuiInputBase-input:focus-visible": {
      outline: "none !important",
      boxShadow: "none !important",
    },
  },
};
