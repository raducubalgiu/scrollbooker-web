import { Button } from "@mui/material";
import React from "react";

type BookingCartActionsProps = {
  isLastStep: boolean;
  isLoadingNext: boolean;
  isNextDisabled: boolean;
  onNext: () => void;
};

const BookingCartActions = ({
  isLastStep,
  isLoadingNext,
  isNextDisabled,
  onNext,
}: BookingCartActionsProps) => {
  return (
    <Button
      variant="contained"
      size="large"
      disableElevation
      fullWidth
      onClick={onNext}
      loading={isLoadingNext}
      disabled={isNextDisabled || isLoadingNext}
      sx={styles.button}
    >
      {isLastStep ? "Finalizează" : "Continuă"}
    </Button>
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
