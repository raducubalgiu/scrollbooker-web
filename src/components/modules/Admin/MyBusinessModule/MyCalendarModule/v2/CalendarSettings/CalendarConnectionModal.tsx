"use client";

import React, { useState } from "react";
import { Alert, Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import { toast } from "react-toastify";
import axios from "axios";
import dayjs from "@/lib/dayjs";
import Modal from "@/components/core/Modal/Modal";
import {
  useConnectGoogleCalendar,
  useDisconnectGoogleCalendar,
  useGetMyCalendarConnection,
} from "@/controllers/integration/calendarConnection.controller";
import {
  GoogleCalendarAuthCancelledError,
  useGoogleCalendarCodeClient,
} from "@/hooks/useGoogleCalendarCodeClient";
import { CalendarConnection } from "@/ts/models/integration/CalendarConnection";

type CalendarConnectionModalProps = {
  open: boolean;
  canConnect: boolean;
  onClose: () => void;
};

const connectErrorMessage = (error: unknown) => {
  const status = axios.isAxiosError(error) ? error.response?.status : undefined;
  const detail = axios.isAxiosError(error) ? String(error.response?.data?.detail ?? "") : "";
  if (status === 400 && detail.includes("email")) {
    return "Nu am putut citi adresa de email a contului Google. Permite accesul la email și încearcă din nou.";
  }
  if (status === 400 && detail.includes("calendar")) {
    return "Permite accesul la Google Calendar ca să poți conecta contul.";
  }
  if (status === 409) {
    return "Acest cont Google este deja conectat la alt cont ScrollBooker.";
  }
  if (status === 403) {
    return "Fiecare angajat își conectează propriul cont Google Calendar.";
  }
  return "Conectarea cu Google Calendar a eșuat.";
};

export const isCalendarConnected = (connection: CalendarConnection | null | undefined) =>
  connection?.status === "active";

const CalendarConnectionModal = ({
  open,
  canConnect,
  onClose,
}: CalendarConnectionModalProps) => {
  const [isConfirmingDisconnect, setIsConfirmingDisconnect] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const { data: connection, isLoading, isError } = useGetMyCalendarConnection({ enabled: open });
  const { mutate: connect, isPending: isConnecting } = useConnectGoogleCalendar();
  const { mutate: disconnect, isPending: isDisconnecting } = useDisconnectGoogleCalendar();
  const { isReady, isConfigured, requestServerAuthCode } =
    useGoogleCalendarCodeClient();

  const isConnected = isCalendarConnected(connection);
  const isBusy = isAuthorizing || isConnecting || isDisconnecting;

  const handleClose = () => {
    setIsConfirmingDisconnect(false);
    onClose();
  };

  const handleConnect = async () => {
    setIsAuthorizing(true);
    try {
      const code = await requestServerAuthCode();
      connect(code, {
        onSuccess: () => toast.success("Google Calendar a fost conectat."),
        onError: (error) => toast.error(connectErrorMessage(error)),
      });
    } catch (error) {
      if (!(error instanceof GoogleCalendarAuthCancelledError)) {
        toast.error("Nu am putut deschide autorizarea Google.");
      }
    } finally {
      setIsAuthorizing(false);
    }
  };

  const handleDisconnect = () => {
    disconnect(undefined, {
      onSuccess: () => {
        setIsConfirmingDisconnect(false);
        toast.success("Google Calendar a fost deconectat.");
      },
      onError: () => toast.error("Deconectarea a eșuat."),
    });
  };

  const renderBody = () => {
    if (isLoading) {
      return (
        <Box sx={styles.centered}>
          <CircularProgress size={28} />
        </Box>
      );
    }

    if (isError) {
      return (
        <Typography color="text.secondary" sx={styles.centered}>
          Nu am putut încărca starea conexiunii cu Google Calendar.
        </Typography>
      );
    }

    return (
      <Stack spacing={2}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={styles.icon}>
            <EventAvailableOutlinedIcon />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography fontWeight={700}>Google Calendar</Typography>
            <Typography variant="body2" color={isConnected ? "success.main" : "text.secondary"} noWrap>
              {isConnected
                ? `Conectat${connection?.google_account_email ? ` · ${connection.google_account_email}` : ""}`
                : "Neconectat"}
            </Typography>
          </Box>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Conectează-ți contul Google Calendar pentru a sincroniza automat programările.
        </Typography>

        {isConnected && connection?.last_synced_at && (
          <Typography variant="caption" color="text.secondary">
            Ultima sincronizare: {dayjs(connection.last_synced_at).format("D MMM YYYY, HH:mm")}
          </Typography>
        )}

        {isConnected && connection?.has_sync_conflicts && (
          <Alert severity="warning">
            Au fost detectate conflicte de sincronizare cu Google Calendar.
          </Alert>
        )}

        {connection?.status === "error" && (
          <Alert severity="error">
            Conexiunea nu mai funcționează. Conectează din nou contul Google.
          </Alert>
        )}

        {!canConnect && !isConnected && (
          <Alert severity="info">
            Business-ul tău are angajați, iar programările sunt primite de ei. Fiecare angajat își conectează propriul cont Google Calendar.
          </Alert>
        )}

        {!isConfigured && (
          <Alert severity="info">Integrarea Google Calendar nu este configurată.</Alert>
        )}

        {isConfirmingDisconnect && (
          <Alert severity="warning">
            Sigur vrei să deconectezi Google Calendar? Programările nu se vor mai sincroniza.
          </Alert>
        )}
      </Stack>
    );
  };

  const footer = isConnected ? (
    isConfirmingDisconnect ? (
      <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
        <Button
          fullWidth
          variant="outlined"
          color="neutral"
          disabled={isBusy}
          onClick={() => setIsConfirmingDisconnect(false)}
        >
          Renunță
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error"
          disableElevation
          loading={isDisconnecting}
          disabled={isBusy}
          onClick={handleDisconnect}
        >
          Deconectează
        </Button>
      </Stack>
    ) : (
      <Button
        fullWidth
        variant="outlined"
        color="error"
        disabled={isBusy}
        onClick={() => setIsConfirmingDisconnect(true)}
      >
        Deconectează
      </Button>
    )
  ) : (
    <Button
      fullWidth
      variant="contained"
      disableElevation
      loading={isAuthorizing || isConnecting}
      disabled={
        isBusy || isLoading || !isConfigured || !isReady || !canConnect
      }
      onClick={handleConnect}
    >
      Conectează Google Calendar
    </Button>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Conectare calendar"
      maxWidth="xs"
      fullWidth
      dividers={false}
      customFooter={footer}
    >
      <Box sx={{ px: { xs: 2, lg: 0 }, pb: 1 }}>{renderBody()}</Box>
    </Modal>
  );
};

export default CalendarConnectionModal;

const styles = {
  centered: {
    display: "flex",
    justifyContent: "center",
    py: 4,
    textAlign: "center",
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "action.hover",
    flexShrink: 0,
  },
};
