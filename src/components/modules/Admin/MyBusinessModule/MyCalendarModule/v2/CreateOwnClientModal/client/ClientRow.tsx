import React from "react";
import { Avatar, Stack, Theme, Typography, alpha } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";
import { maskedPhone } from "@/utils/maskContact";

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
      sx={[styles.row, isSelected && styles.selected]}
    >
      <Avatar sx={[isSelected && styles.avatarSelected]}>
        {client.fullname.charAt(0).toUpperCase()}
      </Avatar>

      <Stack sx={{ flex: 1, minWidth: 0 }}>
        <Typography fontWeight={isSelected ? 700 : 600} noWrap>
          {client.fullname}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {client.phone ? maskedPhone(client.phone) : "Fără număr de telefon"}
        </Typography>
      </Stack>

      {isSelected && <CheckCircleIcon color="primary" sx={{ flexShrink: 0 }} />}
    </Stack>
  );
};

export default ClientRow;

const styles = {
  row: {
    p: 1.5,
    borderRadius: 3,
    border: 1,
    borderColor: "transparent",
    cursor: "pointer",
    "&:hover": { bgcolor: "action.hover" },
  },
  selected: {
    borderColor: "primary.main",
    bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
    "&:hover": {
      bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.12),
    },
  },
  avatarSelected: {
    bgcolor: "primary.main",
    color: "primary.contrastText",
  },
};
