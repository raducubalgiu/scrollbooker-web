import {
  Box,
  Button,
  Divider,
  Fade,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import VideoHeader from "../VideoDetailModule/sidebar/VideoHeader";

type UploadVideoSidebarProps = {
  currentStep: number;
  onSetCurrentStep: (step: number) => void;
  description: string;
  onDescriptionChange: (d: string) => void;
};

const UploadVideoSidebar = ({
  currentStep,
  description,
  onSetCurrentStep,
  onDescriptionChange,
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
        <Box sx={{ p: 2.5, pb: 0, zIndex: 10, bgcolor: "background.paper" }}>
          <VideoHeader
            isLoading={false}
            displayDescription={false}
            description={null}
            user={{
              id: 1,
              username: "frizeria_figaro",
              fullname: "Frizeria Figaro",
              avatar: "",
              is_follow: false,
              ratings_average: 4.5,
              ratings_count: 0,
              profession: "",
            }}
          />
          <Divider sx={{ mt: 4 }} />
        </Box>

        <Box
          sx={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            px: 2.5,
            py: 1,
          }}
        >
          <Slide
            direction="down"
            in={currentStep === 0}
            mountOnEnter
            unmountOnExit
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
                Pasul 1: Detalii postare
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Descrierea ar trebui să reflecte clar conținutul videoclipului
                și valoarea oferită utilizatorilor.
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={4}
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="Descriere..."
                sx={{ mt: 2.5 }}
              />

              <Stack flexDirection="row" justifyContent="flex-end" mt={1}>
                <Typography color="text.secondary">0 / 255</Typography>
              </Stack>
            </Box>
          </Slide>

          <Slide
            direction="up"
            in={currentStep === 1}
            mountOnEnter
            unmountOnExit
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
                Pasul 2: Ataseaza produse
              </Typography>
              {/* ... restul conținutului pasului 2 */}
            </Box>
          </Slide>
        </Box>

        <Box sx={{ p: 2.5, pt: 0, zIndex: 10, bgcolor: "background.paper" }}>
          <Divider sx={{ mb: 2, opacity: 0.6 }} />

          <Stack
            flexDirection="row"
            alignItems="center"
            gap={2}
            sx={{ position: "relative", minHeight: 56 }}
          >
            {currentStep === 1 && (
              <Fade in={currentStep === 1}>
                <Button
                  onClick={() => onSetCurrentStep(0)}
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  sx={{
                    p: 1.8,
                    fontWeight: 600,
                    textTransform: "none",
                    borderColor: "divider",
                  }}
                >
                  Înapoi
                </Button>
              </Fade>
            )}

            <Fade in={true} key={currentStep}>
              <Button
                onClick={() => currentStep === 0 && onSetCurrentStep(1)}
                variant="contained"
                fullWidth
                disableElevation
                sx={{
                  p: 1.8,
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1rem",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {currentStep === 0 ? "Pasul următor" : "Postează video"}
              </Button>
            </Fade>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default UploadVideoSidebar;
