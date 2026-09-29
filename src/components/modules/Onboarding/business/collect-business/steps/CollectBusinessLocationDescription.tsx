import { TextField } from "@mui/material";
import React, { memo } from "react";
import BusinessOnboardingSectionLayout from "../../../BusinessOnboardingSectionLayout";
import { useTranslations } from "next-intl";

type CollectBusinessLocationDescriptionProps = {
  ownerFullName: string;
  onHandleOwnerFullName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  businessDescription: string;
  onHandleBusinessDescription: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

const CollectBusinessLocationDescription = ({
  ownerFullName,
  onHandleOwnerFullName,
  businessDescription,
  onHandleBusinessDescription,
}: CollectBusinessLocationDescriptionProps) => {
  const t = useTranslations("onboarding.business.locationDescription");

  return (
    <BusinessOnboardingSectionLayout
      title={t("title")}
      description={t("subtitle")}
      onClick={() => {}}
      isDisabled={false}
      isLoading={false}
      displayButton={false}
    >
      <TextField
        value={ownerFullName}
        onChange={onHandleOwnerFullName}
        autoFocus={false}
        placeholder={t("namePlaceholder")}
        variant="outlined"
        fullWidth
        sx={{ mb: 2.5 }}
      />

      <TextField
        value={businessDescription}
        onChange={onHandleBusinessDescription}
        autoFocus={false}
        placeholder={t("descriptionPlaceholder")}
        variant="outlined"
        fullWidth
        multiline
        minRows={4}
        maxRows={6}
      />
    </BusinessOnboardingSectionLayout>
  );
};

export default memo(CollectBusinessLocationDescription);
