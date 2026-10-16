"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { toast } from "react-toastify";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  useCreateBusinessClient,
  useGetBusinessClients,
} from "@/controllers/booking/businessClient.controller";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";
import ClientRow from "./ClientRow";

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
  const [isCreating, setIsCreating] = useState(false);
  const [newFullname, setNewFullname] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const debouncedSearch = useDebouncedValue(search, 400);

  const { data, isLoading } = useGetBusinessClients({
    businessId,
    query: debouncedSearch,
    isEnabled: open,
  });

  const { mutate: createClient, isPending: isCreatingClient } =
    useCreateBusinessClient();

  const handleClose = () => {
    setIsCreating(false);
    setNewFullname("");
    setNewPhone("");
    setSearch("");
    onClose();
  };

  const handleCreateClient = () => {
    if (newFullname.trim().length < 3) {
      toast.error("Introdu un nume valid pentru client.");
      return;
    }

    createClient(
      {
        businessId,
        data: { fullname: newFullname.trim(), phone: newPhone.trim() || null },
      },
      {
        onSuccess: (client) => {
          toast.success("Client adăugat cu succes!");
          onSelectClient(client);
          setIsCreating(false);
          setNewFullname("");
          setNewPhone("");
        },
      }
    );
  };

  const clients = data?.results ?? [];

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

        <Typography fontWeight={700}>
          {isCreating ? "Client nou" : "Selectează clientul"}
        </Typography>

        <Box sx={{ width: 34 }} />
      </Stack>

      <Box sx={styles.content}>
        {isCreating ? (
          <Stack spacing={2}>
            <TextField
              autoFocus
              label="Nume complet"
              placeholder="Numele clientului"
              value={newFullname}
              onChange={(e) => setNewFullname(e.target.value)}
              fullWidth
            />
            <TextField
              label="Telefon (opțional)"
              placeholder="07xxxxxxxx"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              fullWidth
            />
          </Stack>
        ) : (
          <Stack spacing={2}>
            <TextField
              placeholder="Caută după nume sau telefon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />

            <Button
              startIcon={<PersonAddAltIcon />}
              onClick={() => setIsCreating(true)}
              sx={{ justifyContent: "flex-start" }}
            >
              Adaugă client nou
            </Button>

            <Divider />

            <Stack sx={{ minHeight: 160 }}>
              {isLoading && (
                <Typography sx={styles.message}>Se încarcă...</Typography>
              )}

              {!isLoading && clients.length === 0 && (
                <Typography sx={styles.message}>
                  Nu a fost găsit niciun client.
                </Typography>
              )}

              {!isLoading &&
                clients.map((client) => (
                  <ClientRow
                    key={client.id}
                    client={client}
                    isSelected={client.id === selectedClientId}
                    onClick={() => onSelectClient(client)}
                  />
                ))}
            </Stack>
          </Stack>
        )}
      </Box>

      <Divider />
      <Box sx={{ p: 2 }}>
        {isCreating ? (
          <Stack direction="row" spacing={1.5}>
            <Button fullWidth variant="outlined" onClick={() => setIsCreating(false)}>
              Înapoi
            </Button>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              disabled={isCreatingClient}
              loading={isCreatingClient}
              onClick={handleCreateClient}
            >
              Salvează
            </Button>
          </Stack>
        ) : (
          <Button fullWidth variant="outlined" onClick={handleClose}>
            Închide
          </Button>
        )}
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
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    p: 2,
    pt: 0,
    overflowY: "auto",
  },
  message: {
    textAlign: "center",
    color: "text.secondary",
    p: 2.5,
  },
};
