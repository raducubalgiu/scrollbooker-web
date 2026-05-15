import { AppointmentUtils } from "@/ts/models/booking/appointment/Appointment";
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import { Box, Button } from "@mui/material";
import React from "react";

type AppointmentDetailsActionsProps = {
  startDate: string;
  status: AppointmentStatusEnum;
  onBookAgain: () => void;
  onCancel: () => void;
};

const AppointmentDetailsActions = ({
  startDate,
  status,
  onBookAgain,
  onCancel,
}: AppointmentDetailsActionsProps) => {
  const isInPast = AppointmentUtils.isInPast(startDate);

  return (
    <Box>
      {status !== AppointmentStatusEnum.IN_PROGRESS && (
        <Button
          variant="contained"
          fullWidth
          disableElevation
          size="large"
          sx={{ mt: 4, py: 1.5, fontSize: 18 }}
          onClick={onBookAgain}
        >
          Rezervă din nou
        </Button>
      )}

      {status === AppointmentStatusEnum.IN_PROGRESS && !isInPast && (
        <Button
          variant="contained"
          color="error"
          fullWidth
          disableElevation
          size="large"
          sx={{ mt: 4, py: 1.5, fontSize: 18 }}
          onClick={onCancel}
        >
          Anulează
        </Button>
      )}
    </Box>
  );
};

export default AppointmentDetailsActions;
