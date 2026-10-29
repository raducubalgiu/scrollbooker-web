import { Button, Stack } from "@mui/material";
import React from "react";
import { useTranslations } from "next-intl";
import AuthGradientButton from "@/components/modules/AuthModule/AuthGradientButton";

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
        py: 3,
        borderTop: "1px solid",
        borderColor: "divider",
        mx: { xs: 2, md: 10 },
      }}
    >
      <Button disabled={isFirstStep || isLoading} onClick={onHandleBack}>
        {t("back")}
      </Button>
      <AuthGradientButton
        fullWidth={false}
        onClick={onHandleNext}
        loading={isLoading}
        disableElevation
        disabled={isDisabledNext}
      >
        {isLastStep ? t("finish") : t("continue")}
      </AuthGradientButton>
    </Stack>
  );
};

export default CollectBusinessFooter;
