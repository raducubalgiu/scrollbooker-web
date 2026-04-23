import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import { Box, Button } from "@mui/material";
import React from "react";

type AppointmentDetailsActionsProps = {
  status: AppointmentStatusEnum;
  onBookAgain: () => void;
  onCancel: () => void;
};

const AppointmentDetailsActions = ({
  status,
  onBookAgain,
  onCancel,
}: AppointmentDetailsActionsProps) => {
  return (
    <Box>
      {status === AppointmentStatusEnum.FINISHED && (
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

      {status === AppointmentStatusEnum.IN_PROGRESS && (
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
