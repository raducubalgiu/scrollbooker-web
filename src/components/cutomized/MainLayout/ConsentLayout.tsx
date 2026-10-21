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

type ConsentLayoutProps = {
  acknowledged?: boolean;
  setAcknowledged?: (e: boolean) => void;
  mainTitle: string;
  isLoading: boolean;
  sections: string[];
  hideAcknowledgement?: boolean;
};

export default function ConsentLayout({
  isLoading,
  mainTitle,
  acknowledged,
  setAcknowledged,
  sections,
  hideAcknowledgement = false,
}: ConsentLayoutProps) {
  return (
    <>
      <Box
        sx={{
          p: 2,
          height: 500,
          overflow: "auto",
          my: 2.5,
          bgcolor: "secondary.main",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
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
                  primary={<Typography>{title}</Typography>}
                  secondary={<Typography>{description}</Typography>}
                />
              </ListItem>
            );
          })}
        {isLoading && <CircularProgress />}
      </Box>

      {!hideAcknowledgement && (
        <Box>
          <FormControlLabel
            label="Am citit și sunt de acord cu condițiile de mai sus."
            control={
              <Checkbox
                checked={acknowledged ?? false}
                onChange={(e) => setAcknowledged?.(e.target.checked)}
              />
            }
          />
        </Box>
      )}
    </>
  );
}
