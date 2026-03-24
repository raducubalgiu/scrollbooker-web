import React from "react";
import {
  Typography,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

type ConsentProps = {
  acknowledged: boolean;
  setAcknowledged: (e: boolean) => void;
  mainTitle: string;
  isLoading: boolean;
  sections: string[];
};

export default function Consent({
  isLoading,
  mainTitle,
  acknowledged,
  setAcknowledged,
  sections,
}: ConsentProps) {
  return (
    <>
      <Box
        sx={{
          p: 2,
          height: 300,
          overflow: "auto",
          my: 2.5,
          bgcolor: "secondary.main",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {mainTitle}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Te rugăm să citești cu atenție informațiile de mai jos:
        </Typography>
        {!isLoading &&
          sections?.map((section, index) => {
            const [titleLine, ...descLines] = section.split("\n- ");
            const title = titleLine?.trim();
            const description = descLines.join("\n- ").trim();

            return (
              <ListItem key={index} alignItems="flex-start">
                <ListItemText
                  primary={<Typography variant="subtitle1">{title}</Typography>}
                  secondary={
                    <Typography variant="body2">{description}</Typography>
                  }
                />
              </ListItem>
            );
          })}
        {isLoading && <CircularProgress />}
      </Box>

      <Box>
        <FormControlLabel
          label="Am citit și sunt de acord cu condițiile de mai sus."
          control={
            <Checkbox
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
            />
          }
        />
      </Box>
    </>
  );
}
