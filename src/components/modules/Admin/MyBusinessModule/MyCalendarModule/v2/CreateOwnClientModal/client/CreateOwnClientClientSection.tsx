"use client";

import React from "react";
import { Button, ButtonBase, Stack, Typography } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";
import SelectedClientCard from "./SelectedClientCard";

type CreateOwnClientClientSectionProps = {
  selectedClient: BusinessClient | null;
  onClearClient: () => void;
  onAddClient: () => void;
  onOpenSelect: () => void;
};

const CreateOwnClientClientSection = ({
  selectedClient,
  onClearClient,
  onAddClient,
  onOpenSelect,
}: CreateOwnClientClientSectionProps) => {
  return (
    <Stack spacing={1.5}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight={700}>
          1. Client
        </Typography>

        <Button
          size="small"
          startIcon={<PersonAddAltIcon />}
          disabled={!!selectedClient}
          onClick={onAddClient}
        >
          Adaugă client nou
        </Button>
      </Stack>

      {selectedClient ? (
        <SelectedClientCard client={selectedClient} onClear={onClearClient} />
      ) : (
        <ButtonBase onClick={onOpenSelect} sx={styles.searchTrigger}>
          <SearchIcon sx={{ color: "text.secondary", fontSize: 22 }} />
          <Typography color="text.secondary" noWrap>
            Caută după nume sau telefon
          </Typography>
        </ButtonBase>
      )}
    </Stack>
  );
};

export default CreateOwnClientClientSection;

const styles = {
  searchTrigger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 1,
    width: "100%",
    height: 44,
    px: 1.5,
    borderRadius: "14px",
    bgcolor: "action.hover",
  },
};
