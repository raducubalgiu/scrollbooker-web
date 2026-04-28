import { alpha, Box, Button, Fade, Stack, Typography } from "@mui/material";
import React from "react";
import { BookingStepEnum } from "../BookingModule";

type BookingSidebarProps = {
  currentStep: BookingStepEnum;
  onNext: () => void;
  onBack: () => void;
};

const BookingSidebar = ({
  currentStep,
  onBack,
  onNext,
}: BookingSidebarProps) => {
  const isFirstStep = currentStep === BookingStepEnum.SERVICES;
  const isLastStep = currentStep === BookingStepEnum.CONFIRM;

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        position: "sticky",
        top: 130,
        height: "calc(100vh - 170px)",
        overflowY: "auto",
        "&::-webkit-scrollbar": { display: "none" },

        bgcolor: "background.paper",
        borderRadius: 8,
        border: 1.5,
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        p: 6,

        flexDirection: "column",
      }}
    >
      <Typography variant="h4" fontWeight={900} mb={4} letterSpacing="-0.02em">
        Coșul tău
      </Typography>

      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.6 }}
        >
          Aici vei vedea serviciile selectate. Spațiul generos ajută la
          claritate.
        </Typography>
      </Box>

      <Box
        sx={{
          pt: 2,
          mt: "auto",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Fade in={!isFirstStep} unmountOnExit>
            <Button
              variant="outlined"
              color="inherit"
              onClick={onBack}
              fullWidth
              sx={{
                p: 1.75,
                fontSize: 18,
                fontWeight: 700,
                textTransform: "none",
                transition: "all 0.3s ease-in-out",
              }}
            >
              Înapoi
            </Button>
          </Fade>

          <Button
            variant="contained"
            size="large"
            disableElevation
            fullWidth
            sx={{
              p: 1.75,
              fontSize: 18,
              fontWeight: 700,
              textTransform: "none",
              transition: "all 0.3s ease-in-out",
            }}
            onClick={onNext}
          >
            {isLastStep ? "Finalizează" : "Continuă"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default BookingSidebar;
