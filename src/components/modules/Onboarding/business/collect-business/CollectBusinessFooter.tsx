import { Button, Stack } from "@mui/material";
import React from "react";

type CollectBusinessFooterProps = {
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  onHandleBack: () => void;
  onHandleNext: () => void;
};

const CollectBusinessFooter = ({
  isFirstStep,
  isLastStep,
  isLoading,
  onHandleBack,
  onHandleNext,
}: CollectBusinessFooterProps) => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-end"
      gap={1}
      sx={{
        p: 3,
        borderTop: "1px solid",
        borderColor: "divider",
        mx: 10,
      }}
    >
      <Button
        disabled={isFirstStep || isLoading}
        onClick={onHandleBack}
        size="large"
      >
        Înapoi
      </Button>
      <Button
        variant="contained"
        onClick={onHandleNext}
        loading={isLoading}
        size="large"
        disableElevation
      >
        {isLastStep ? "Finalizează pasul" : "Continuă"}
      </Button>
    </Stack>
  );
};

export default CollectBusinessFooter;
