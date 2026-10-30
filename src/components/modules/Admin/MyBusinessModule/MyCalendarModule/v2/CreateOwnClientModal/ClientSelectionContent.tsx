"use client";

import React, { useState } from "react";
import { Stack } from "@mui/material";
import SearchBar from "@/components/core/Input/SearchBar";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";
import ClientsList from "./ClientsList";

type ClientSelectionContentProps = {
  businessId: number;
  isActive: boolean;
  selectedClientId: number | null;
  onSelectClient: (client: BusinessClient) => void;
};

const ClientSelectionContent = ({
  businessId,
  isActive,
  selectedClientId,
  onSelectClient,
}: ClientSelectionContentProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 400);

  return (
    <Stack spacing={1.5}>
      <SearchBar
        value={search}
        placeholder="Caută după nume sau telefon"
        autoFocus={false}
        onChange={setSearch}
        onReset={() => setSearch("")}
        sx={styles.searchBar}
      />

      <ClientsList
        businessId={businessId}
        query={debouncedSearch}
        isActive={isActive}
        selectedClientId={selectedClientId}
        onSelectClient={onSelectClient}
      />
    </Stack>
  );
};

export default ClientSelectionContent;

const styles = {
  searchBar: {
    flex: "none",
    bgcolor: "action.hover",
  },
};
