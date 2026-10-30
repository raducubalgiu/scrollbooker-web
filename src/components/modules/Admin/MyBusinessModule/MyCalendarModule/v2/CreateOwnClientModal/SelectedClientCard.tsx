import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";
import { maskedPhone } from "@/utils/maskContact";

type SelectedClientCardProps = {
  client: BusinessClient;
  onClear: () => void;
};

const SelectedClientCard = ({ client, onClear }: SelectedClientCardProps) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={styles.card}>
      <Avatar sx={styles.avatar}>{client.fullname.charAt(0).toUpperCase()}</Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography fontSize={16} fontWeight={600} noWrap>
          {client.fullname}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.2 }}>
          {client.phone ? maskedPhone(client.phone) : "Fără număr de telefon"}
        </Typography>
      </Box>

      <Tooltip title="Elimină clientul">
        <IconButton onClick={onClear} color="error" sx={styles.removeButton}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default SelectedClientCard;

const styles = {
  card: {
    border: 1,
    borderColor: "divider",
    borderRadius: 3,
    bgcolor: "background.paper",
    px: 2,
    py: 1.5,
  },
  avatar: {
    width: 36,
    height: 36,
    fontSize: 16,
  },
  removeButton: {
    bgcolor: "background.default",
    flexShrink: 0,
    "&:hover": { bgcolor: "action.hover" },
  },
};
