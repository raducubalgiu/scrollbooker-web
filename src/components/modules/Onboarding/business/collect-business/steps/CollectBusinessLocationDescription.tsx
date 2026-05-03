import { TextField } from "@mui/material";
import React, { memo } from "react";
import BusinessOnboardingSectionLayout from "../../../BusinessOnboardingSectionLayout";

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
  return (
    <BusinessOnboardingSectionLayout
      title="Prezentarea locației"
      description=" Spune-ne cum se numește business-ul tău și oferă cateva detalii despre
          servicii, atmosferă sau orice crezi ca este important"
      onClick={() => {}}
      isDisabled={false}
      isLoading={false}
      displayButton={false}
    >
      <TextField
        value={ownerFullName}
        onChange={onHandleOwnerFullName}
        autoFocus={false}
        placeholder="Nume"
        variant="outlined"
        fullWidth
        sx={{ mb: 2.5 }}
      />

      <TextField
        value={businessDescription}
        onChange={onHandleBusinessDescription}
        autoFocus={false}
        placeholder="Descriere"
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
