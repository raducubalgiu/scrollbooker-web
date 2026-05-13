import { Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";

type UploadVideoDescriptionProps = {
  description: string;
  onDescriptionChange: (s: string) => void;
};

const UploadVideoDescription = ({
  description,
  onDescriptionChange,
}: UploadVideoDescriptionProps) => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={1}>
        Descriere
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Descrierea ar trebui să reflecte clar conținutul videoclipului și
        valoarea oferită utilizatorilor.
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={2}
        maxRows={2}
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Descriere..."
        sx={{ mt: 2.5 }}
        slotProps={{
          htmlInput: {
            maxLength: 500,
          },
        }}
      />

      <Stack flexDirection="row" justifyContent="flex-end" mt={1}>
        <Typography color="text.secondary">0 / 500</Typography>
      </Stack>
    </Box>
  );
};

export default UploadVideoDescription;
