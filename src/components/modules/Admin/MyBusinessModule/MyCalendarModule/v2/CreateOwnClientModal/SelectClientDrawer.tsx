"use client";

import React, { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchBar from "@/components/core/Input/SearchBar";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";
import ClientsList from "./ClientsList";

type SelectClientDrawerProps = {
  open: boolean;
  businessId: number;
  selectedClientId: number | null;
  onClose: () => void;
  onSelectClient: (client: BusinessClient) => void;
};

const SelectClientDrawer = ({
  open,
  businessId,
  selectedClientId,
  onClose,
  onSelectClient,
}: SelectClientDrawerProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 400);

  const handleClose = () => {
    setSearch("");
    onClose();
  };

  const handleSelect = (client: BusinessClient) => {
    setSearch("");
    onSelectClient(client);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      sx={styles.drawer}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, pb: 1.5 }}
      >
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>

        <Typography fontWeight={700}>Selectează clientul</Typography>

        <Box sx={{ width: 34 }} />
      </Stack>

      <Box sx={{ px: 2, pb: 1.5 }}>
        <SearchBar
          value={search}
          placeholder="Caută după nume sau telefon"
          autoFocus={false}
          onChange={setSearch}
          onReset={() => setSearch("")}
          sx={styles.searchBar}
        />
      </Box>
      <Divider />

      <Box sx={styles.content}>
        <ClientsList
          businessId={businessId}
          query={debouncedSearch}
          isActive={open}
          selectedClientId={selectedClientId}
          onSelectClient={handleSelect}
        />
      </Box>
    </Drawer>
  );
};

export default SelectClientDrawer;

const styles = {
  drawer: {
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
  },
  paper: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: "90vh",
    display: "flex",
    flexDirection: "column",
  },
  searchBar: {
    flex: "none",
    bgcolor: "action.hover",
  },
  content: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    px: 1,
    py: 1,
  },
};
