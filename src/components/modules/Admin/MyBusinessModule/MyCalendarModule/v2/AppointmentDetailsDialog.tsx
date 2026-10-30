"use client";

import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Modal from "@/components/core/Modal/Modal";
import { useGetAppointmentById } from "@/controllers/booking/appointments.controller";
import AppointmentDetailsContent from "@/components/modules/Marketplace/AppointmentDetailsModule/AppointmentDetailsContent";

type AppointmentDetailsDialogProps = {
  appointmentId: number | null;
  onClose: () => void;
  onAppointmentChange: () => void;
};

const AppointmentDetailsDialog = ({
  appointmentId,
  onClose,
  onAppointmentChange,
}: AppointmentDetailsDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    data: appointment,
    isLoading,
    isError,
  } = useGetAppointmentById(appointmentId);

  const renderBody = () => {
    if (isLoading) {
      return (
        <Box sx={styles.centered}>
          <CircularProgress />
        </Box>
      );
    }

    if (isError || !appointment) {
      return (
        <Box sx={styles.centered}>
          <Typography color="text.secondary">
            Detaliile programării nu au putut fi încărcate.
          </Typography>
        </Box>
      );
    }

    return (
      <AppointmentDetailsContent
        key={appointment.id}
        appointment={appointment}
        isSingleColumn
        onAppointmentChange={onAppointmentChange}
      />
    );
  };

  return (
    <Modal
      open={appointmentId !== null}
      handleClose={onClose}
      title="Detalii programare"
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      dividers={false}
    >
      {renderBody()}
    </Modal>
  );
};

export default AppointmentDetailsDialog;

const styles = {
  centered: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 320,
    textAlign: "center",
    px: 2,
  },
};
