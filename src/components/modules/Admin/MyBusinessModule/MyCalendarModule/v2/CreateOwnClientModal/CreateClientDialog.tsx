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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import Modal from "@/components/core/Modal/Modal";
import { useCreateBusinessClient } from "@/controllers/booking/businessClient.controller";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";

type CreateClientDialogProps = {
  open: boolean;
  businessId: number;
  onClose: () => void;
  onCreated: (client: BusinessClient) => void;
};

const CreateClientDialog = ({
  open,
  businessId,
  onClose,
  onCreated,
}: CreateClientDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");

  const { mutate: createClient, isPending } = useCreateBusinessClient();

  const resetForm = () => {
    setFullname("");
    setPhone("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSave = () => {
    if (fullname.trim().length < 3) {
      toast.error("Introdu un nume valid pentru client.");
      return;
    }

    createClient(
      {
        businessId,
        data: { fullname: fullname.trim(), phone: phone.trim() || null },
      },
      {
        onSuccess: (client) => {
          toast.success("Client adăugat cu succes!");
          resetForm();
          onCreated(client);
        },
      }
    );
  };

  const fields = (
    <Stack spacing={2}>
      <TextField
        autoFocus
        label="Nume complet"
        placeholder="Numele clientului"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        fullWidth
      />
      <TextField
        label="Telefon (opțional)"
        placeholder="07xxxxxxxx"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
      />
    </Stack>
  );

  const saveButton = (
    <Button
      fullWidth
      variant="contained"
      disableElevation
      disabled={isPending}
      loading={isPending}
      onClick={handleSave}
    >
      Salvează clientul
    </Button>
  );

  if (!isMobile) {
    return (
      <Modal
        open={open}
        handleClose={handleClose}
        title="Client nou"
        maxWidth="xs"
        fullWidth
        dividers={false}
        customFooter={saveButton}
      >
        <Box sx={{ pt: 1, px: { md: 3, lg: 0 } }}>{fields}</Box>
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

        <Typography fontWeight={700}>Client nou</Typography>

        <Box sx={{ width: 34 }} />
      </Stack>

      <Box sx={styles.content}>{fields}</Box>

      <Divider />
      <Box sx={{ p: 2 }}>{saveButton}</Box>
    </Drawer>
  );
};

export default CreateClientDialog;

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
    pt: 1,
    overflowY: "auto",
  },
};
