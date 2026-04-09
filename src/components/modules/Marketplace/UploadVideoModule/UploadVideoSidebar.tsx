import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

type UploadVideoSidebarProps = {
  description: string;
  onDescriptionChange: (d: string) => void;
  onHandleUpload: () => void;
  isDisabled: boolean;
};

const UploadVideoSidebar = ({
  description,
  onDescriptionChange,
  onHandleUpload,
  isDisabled,
}: UploadVideoSidebarProps) => {
  return (
    <Box
      flex={1}
      sx={{
        maxWidth: 600,
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            px: 2.5,
            py: 1,
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "calc(100% - 40px)",
              position: "absolute",
              top: 0,
              pt: 2.5,
            }}
          >
            <Typography variant="h5" fontWeight={600} mb={1}>
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
            />

            <Stack flexDirection="row" justifyContent="flex-end" mt={1}>
              <Typography color="text.secondary">0 / 500</Typography>
            </Stack>

            <Typography variant="h5" fontWeight={600} mb={1}>
              Produse
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Descrierea ar trebui să reflecte clar conținutul videoclipului și
              valoarea oferită utilizatorilor.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 2.5, pt: 0, zIndex: 10, bgcolor: "background.paper" }}>
          <Divider sx={{ mb: 2, opacity: 0.6 }} />

          <Button
            onClick={onHandleUpload}
            variant="contained"
            fullWidth
            disableElevation
            disabled={isDisabled}
            sx={{
              p: 1.8,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Postează
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default UploadVideoSidebar;
