import React from "react";
import { Stack, TextField, Typography } from "@mui/material";

type CreateOwnClientNotesSectionProps = {
  value: string;
  onChange: (value: string) => void;
};

export const NOTES_MAX_LENGTH = 500;

const CreateOwnClientNotesSection = ({
  value,
  onChange,
}: CreateOwnClientNotesSectionProps) => {
  return (
    <Stack spacing={1.5}>
      <Typography variant="subtitle1" fontWeight={700}>
        4. Observații
      </Typography>

      <TextField
        fullWidth
        multiline
        minRows={2}
        maxRows={6}
        placeholder="Adaugă detalii despre programare (opțional)"
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, NOTES_MAX_LENGTH))}
      />

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ alignSelf: "flex-end", mt: 0.5 }}
      >
        {value.length} / {NOTES_MAX_LENGTH}
      </Typography>
    </Stack>
  );
};

export default CreateOwnClientNotesSection;
