"use client";

import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import DeviceSessionItem from "./DeviceSessionItem";
import {
  useRevokeOtherSessions,
  useRevokeSession,
  useUserSessions,
} from "@/controllers/auth/auth.controller";
import { UserSession } from "@/ts/models/auth/UserSession";

const ERROR_MESSAGE = "A apărut o eroare. Încearcă din nou.";

const ConnectedDevicesModule = () => {
  const { data: sessions, isLoading, isError } = useUserSessions();
  const { mutate: revokeSession, isPending: isRevokingSession } =
    useRevokeSession();
  const { mutate: revokeOtherSessions, isPending: isRevokingOthers } =
    useRevokeOtherSessions();

  const [sessionToRevoke, setSessionToRevoke] = useState<UserSession | null>(
    null
  );
  const [confirmRevokeOthers, setConfirmRevokeOthers] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentSession = sessions?.find((session) => session.is_current);
  const otherSessions = sessions?.filter((session) => !session.is_current) ?? [];

  const handleRevokeSession = () => {
    if (!sessionToRevoke) return;
    setErrorMessage(null);

    revokeSession(sessionToRevoke.id, {
      onSettled: () => setSessionToRevoke(null),
      onError: () => setErrorMessage(ERROR_MESSAGE),
    });
  };

  const handleRevokeOthers = () => {
    setErrorMessage(null);

    revokeOtherSessions(undefined, {
      onSettled: () => setConfirmRevokeOthers(false),
      onError: () => setErrorMessage(ERROR_MESSAGE),
    });
  };

  return (
    <Box sx={styles.container}>
      <HeaderMobile title="Dispozitive conectate" />

      <ConfirmationModal
        open={!!sessionToRevoke}
        onClose={() => setSessionToRevoke(null)}
        onConfirm={handleRevokeSession}
        isLoading={isRevokingSession}
        title="Deconectezi dispozitivul?"
        message="Pe acest dispozitiv va trebui să te autentifici din nou ca să folosești contul."
        primaryActionTitle="Deconectează"
      />

      <ConfirmationModal
        open={confirmRevokeOthers}
        onClose={() => setConfirmRevokeOthers(false)}
        onConfirm={handleRevokeOthers}
        isLoading={isRevokingOthers}
        title="Deconectezi celelalte dispozitive?"
        message="Vei rămâne conectat doar pe acest dispozitiv. Pe toate celelalte va trebui să te autentifici din nou."
        primaryActionTitle="Deconectează"
      />

      <Stack spacing={3} sx={styles.content}>
        <Typography variant="body2" color="text.secondary">
          Acestea sunt dispozitivele pe care ești conectat acum. Dacă nu
          recunoști unul dintre ele, deconectează-l și schimbă-ți parola.
        </Typography>

        {isLoading && (
          <Box sx={styles.centered}>
            <CircularProgress size={24} />
          </Box>
        )}

        {isError && (
          <Typography color="error.main" variant="body2">
            {ERROR_MESSAGE}
          </Typography>
        )}

        {currentSession && (
          <Stack spacing={1.5}>
            <Typography sx={styles.sectionTitle}>Dispozitivul curent</Typography>
            <DeviceSessionItem session={currentSession} />
          </Stack>
        )}

        {sessions && (
          <Stack spacing={1.5}>
            <Typography sx={styles.sectionTitle}>Alte dispozitive</Typography>

            {otherSessions.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Nu ești conectat pe alte dispozitive.
              </Typography>
            ) : (
              otherSessions.map((session) => (
                <DeviceSessionItem
                  key={session.id}
                  session={session}
                  action={
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => setSessionToRevoke(session)}
                      sx={{ flexShrink: 0 }}
                    >
                      Deconectează
                    </Button>
                  }
                />
              ))
            )}
          </Stack>
        )}

        {errorMessage && (
          <Typography color="error.main" variant="body2">
            {errorMessage}
          </Typography>
        )}

        {otherSessions.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => setConfirmRevokeOthers(true)}
            sx={styles.revokeOthersButton}
          >
            Deconectează toate celelalte dispozitive
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default ConnectedDevicesModule;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  content: {
    px: 2.5,
    pt: 2.5,
    pb: 4,
  },
  sectionTitle: {
    fontWeight: 600,
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    py: 2,
  },
  revokeOthersButton: {
    alignSelf: { xs: "stretch", lg: "flex-start" },
  },
};
