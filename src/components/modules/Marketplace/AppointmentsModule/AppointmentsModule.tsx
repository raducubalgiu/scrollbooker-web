import { Button, Stack, Typography } from "@mui/material";
import React from "react";

const AppointmentsModule = () => {
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="div"
        fontWeight={700}
        fontSize={25}
        sx={{ mb: 2.5 }}
      >
        Rezervări și abonamente
      </Typography>

      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Button variant="contained" color="primary" disableElevation>
          Rezervari
        </Button>
        <Button variant="outlined" color="secondary" disableElevation>
          Abonamente
        </Button>
      </Stack>
    </>
  );
};

export default AppointmentsModule;
