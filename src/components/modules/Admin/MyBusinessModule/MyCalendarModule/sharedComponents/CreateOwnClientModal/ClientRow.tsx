import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";

type ClientRowProps = {
  client: BusinessClient;
  isSelected: boolean;
  onClick: () => void;
};

const ClientRow = ({ client, isSelected, onClick }: ClientRowProps) => {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      onClick={onClick}
      sx={{
        p: 1.5,
        borderRadius: 2,
        cursor: "pointer",
        bgcolor: isSelected ? "action.selected" : "transparent",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Avatar>{client.fullname.charAt(0).toUpperCase()}</Avatar>

      <Stack sx={{ flex: 1 }}>
        <Typography fontWeight={600}>{client.fullname}</Typography>
        {client.phone && (
          <Typography variant="body2" color="text.secondary">
            {client.phone}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default ClientRow;
