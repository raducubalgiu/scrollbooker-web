"use client";

import React, { useState } from "react";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { toast } from "react-toastify";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  useCreateBusinessClient,
  useGetBusinessClients,
} from "@/controllers/booking/businessClient.controller";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";
import ClientRow from "./ClientRow";

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
  const [isCreating, setIsCreating] = useState(false);
  const [newFullname, setNewFullname] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const debouncedSearch = useDebouncedValue(search, 400);

  const { data, isLoading } = useGetBusinessClients({
    businessId,
    query: debouncedSearch,
    isEnabled: isActive,
  });

  const { mutate: createClient, isPending: isCreatingClient } =
    useCreateBusinessClient();

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
        onError: () => toast.error("Eroare la adăugarea clientului."),
      }
    );
  };

  const clients = data?.results ?? [];

  if (isCreating) {
    return (
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
      </Stack>
    );
  }

  return (
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

      <Stack sx={{ minHeight: 120 }}>
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
  );
};

export default ClientSelectionContent;

const styles = {
  message: {
    textAlign: "center",
    color: "text.secondary",
    p: 2.5,
  },
};
