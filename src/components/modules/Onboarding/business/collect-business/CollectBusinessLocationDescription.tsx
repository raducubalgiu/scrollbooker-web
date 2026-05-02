import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { memo } from "react";

type CollectBusinessLocationDescriptionProps = {
  businessName: string;
  onHandleBusinessName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  businessDescription: string;
  onHandleBusinessDescription: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onSetStep: () => void;
};

const CollectBusinessLocationDescription = ({
  businessName,
  onHandleBusinessName,
  businessDescription,
  onHandleBusinessDescription,
  onSetStep,
}: CollectBusinessLocationDescriptionProps) => {
  return (
    <Box>
      <Stack mb={2} gap={0.5}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Prezentarea locației
        </Typography>

        <Typography color="text.secondary">
          Spune-ne cum se numește business-ul tău și oferă cateva detalii despre
          servicii, atmosferă sau orice crezi ca este important
        </Typography>
      </Stack>

      <TextField
        value={businessName}
        onChange={onHandleBusinessName}
        autoFocus={false}
        placeholder="Nume"
        variant="outlined"
        fullWidth
        sx={{ mb: 2.5 }}
      />

      <TextField
        value={businessDescription}
        onChange={onHandleBusinessDescription}
        autoFocus={false}
        placeholder="Descriere"
        variant="outlined"
        fullWidth
        multiline
        minRows={4}
        maxRows={6}
      />

      <Button
        sx={{ mt: 2.5 }}
        variant="contained"
        size="large"
        disableElevation
        disabled={!businessName}
        onClick={onSetStep}
      >
        Next
      </Button>
    </Box>
  );
};

export default memo(CollectBusinessLocationDescription);
