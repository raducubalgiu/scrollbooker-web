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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@/components/core/Modal/Modal";
import SearchBar from "@/components/core/Input/SearchBar";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";
import ClientsList from "./ClientsList";

type SelectClientDialogProps = {
  open: boolean;
  businessId: number;
  selectedClientId: number | null;
  onClose: () => void;
  onSelectClient: (client: BusinessClient) => void;
};

const SelectClientDialog = ({
  open,
  businessId,
  selectedClientId,
  onClose,
  onSelectClient,
}: SelectClientDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  const searchBar = (
    <SearchBar
      value={search}
      placeholder="Caută după nume sau telefon"
      autoFocus={!isMobile}
      onChange={setSearch}
      onReset={() => setSearch("")}
      sx={styles.searchBar}
    />
  );

  const list = (
    <ClientsList
      businessId={businessId}
      query={debouncedSearch}
      isActive={open}
      selectedClientId={selectedClientId}
      onSelectClient={handleSelect}
    />
  );

  if (!isMobile) {
    return (
      <Modal
        open={open}
        handleClose={handleClose}
        title="Selectează clientul"
        maxWidth="sm"
        fullWidth
        dividers={false}
        contentSx={{ py: 0 }}
      >
        <Box sx={styles.modalBody}>
          <Box sx={{ pb: 1.5 }}>{searchBar}</Box>
          <Divider />
          <Box sx={styles.scrollArea}>{list}</Box>
        </Box>
      </Modal>
    );
  }

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

      <Box sx={{ px: 2, pb: 1.5 }}>{searchBar}</Box>
      <Divider />

      <Box sx={styles.scrollArea}>{list}</Box>
    </Drawer>
  );
};

export default SelectClientDialog;

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
  modalBody: {
    height: "min(65vh, 620px)",
    display: "flex",
    flexDirection: "column",
    px: { xs: 2, lg: 0 },
  },
  searchBar: {
    flex: "none",
    bgcolor: "action.hover",
  },
  scrollArea: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    px: 1,
    py: 1,
  },
};
