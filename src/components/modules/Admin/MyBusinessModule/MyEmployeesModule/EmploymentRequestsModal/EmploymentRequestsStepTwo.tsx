import React from "react";
import { Box, List } from "@mui/material";
import ProfessionListItemSkeletons from "@/components/cutomized/Skeletons/ProfessionListItemSkeletons";
import { Profession } from "@/ts/models/nomenclatures/profession/ProfessionType";
import SelectedProfessionItem from "./SelectedProfessionItem";

type EmploymentRequestsStepTwoProps = {
  selectedProfessionId: number | null;
  onSelectProfessionId: (id: number) => void;
  professions: Profession[] | undefined;
  isLoading: boolean;
};

export default function EmploymentRequestsStepTwo({
  selectedProfessionId,
  onSelectProfessionId,
  professions,
  isLoading,
}: EmploymentRequestsStepTwoProps) {
  return (
    <Box
      sx={{
        height: 300,
        my: 2.5,
        overflow: "auto",
        bgcolor: "secondary.main",
        borderRadius: 5,
      }}
    >
      <List>
        {!isLoading &&
          professions?.map((profession) => (
            <SelectedProfessionItem
              key={profession.id}
              profession={profession.name}
              isSelected={selectedProfessionId === profession.id}
              onClick={() => onSelectProfessionId(profession.id)}
            />
          ))}
      </List>
      {isLoading && <ProfessionListItemSkeletons />}
    </Box>
  );
}
