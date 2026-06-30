import { Button, Stack } from "@mui/material";
import React from "react";

type BookingCartActionsProps = {
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoadingNext: boolean;
  isNextDisabled: boolean;
  onBack: () => void;
  onNext: () => void;
};

const BookingCartActions = ({
  isFirstStep,
  isLastStep,
  isLoadingNext,
  isNextDisabled,
  onBack,
  onNext,
}: BookingCartActionsProps) => {
  return (
    <Stack flexDirection="row" alignItems="center" gap={1.5}>
      {!isFirstStep && (
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          onClick={onBack}
          sx={{ flex: 1, ...styles.button }}
        >
          Înapoi
        </Button>
      )}

      <Button
        variant="contained"
        size="large"
        disableElevation
        fullWidth
        onClick={onNext}
        loading={isLoadingNext}
        disabled={isNextDisabled || isLoadingNext}
        sx={{ flex: 2, ...styles.button }}
      >
        {isLastStep ? "Finalizează" : "Continuă"}
      </Button>
    </Stack>
  );
};

export default BookingCartActions;

const styles = {
  button: {
    p: 1.75,
    fontSize: 18,
    fontWeight: 700,
    textTransform: "none",
  },
};
