import { Button, Stack } from "@mui/material";
import React from "react";
import { useTranslations } from "next-intl";

type CollectBusinessFooterProps = {
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  isDisabledNext: boolean;
  onHandleBack: () => void;
  onHandleNext: () => void;
};

const CollectBusinessFooter = ({
  isFirstStep,
  isLastStep,
  isLoading,
  isDisabledNext,
  onHandleBack,
  onHandleNext,
}: CollectBusinessFooterProps) => {
  const t = useTranslations("onboarding.business.footer");

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
        {t("back")}
      </Button>
      <Button
        variant="contained"
        onClick={onHandleNext}
        loading={isLoading}
        size="large"
        disableElevation
        disabled={isDisabledNext}
      >
        {isLastStep ? t("finish") : t("continue")}
      </Button>
    </Stack>
  );
};

export default CollectBusinessFooter;
