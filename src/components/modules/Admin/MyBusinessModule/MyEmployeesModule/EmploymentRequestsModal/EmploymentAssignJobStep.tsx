"use client";

import ProfessionListItemSkeletons from "@/components/cutomized/Skeletons/ProfessionListItemSkeletons";
import { useGetProfessionsByBusinessType } from "@/controllers/nomenclature/professions.controller";
import { Box, Button, List, Stack, Typography } from "@mui/material";
import React from "react";
import SelectedProfessionItem from "./SelectedProfessionItem";

type EmploymentAssignJobStepProps = {
  businessTypeId: number | null | undefined;
  selectedProfessionId: number | null;
  onSelectProfessionId: (id: number) => void;
};

export default function EmploymentAssignJobStep({
  businessTypeId,
  selectedProfessionId,
  onSelectProfessionId,
}: EmploymentAssignJobStepProps) {
  const {
    data: professions,
    isLoading,
    isError,
    refetch,
  } = useGetProfessionsByBusinessType({ businessTypeId, isEnabled: true });

  return (
    <Box sx={styles.container}>
      {isLoading && <ProfessionListItemSkeletons />}

      {!isLoading && isError && (
        <Stack spacing={1.5} alignItems="center" sx={{ py: 4 }}>
          <Typography sx={styles.message}>
            A apărut o eroare la încărcarea profesiilor.
          </Typography>
          <Button variant="outlined" size="small" onClick={() => refetch()}>
            Încearcă din nou
          </Button>
        </Stack>
      )}

      {!isLoading && !isError && professions?.length === 0 && (
        <Typography sx={styles.message}>
          Nu au fost găsite profesii pentru acest tip de business.
        </Typography>
      )}

      {!isLoading && !isError && !!professions?.length && (
        <List>
          {professions.map((profession) => (
            <SelectedProfessionItem
              key={profession.id}
              profession={profession.name}
              isSelected={selectedProfessionId === profession.id}
              onClick={() => onSelectProfessionId(profession.id)}
            />
          ))}
        </List>
      )}
    </Box>
  );
}

const styles = {
  container: {
    minHeight: 220,
    maxHeight: { xs: 280, sm: 320 },
    my: 2.5,
    overflow: "auto",
    bgcolor: "secondary.main",
    borderRadius: 5,
  },
  message: {
    textAlign: "center",
    color: "text.secondary",
    p: 2.5,
  },
};
