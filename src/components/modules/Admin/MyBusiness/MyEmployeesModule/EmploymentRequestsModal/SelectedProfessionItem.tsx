import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

type SelectedProfessionItem = {
  profession: string;
  isSelected: boolean;
  onClick: () => void;
};

const SelectedProfessionItem = ({
  profession,
  isSelected,
  onClick,
}: SelectedProfessionItem) => {
  return (
    <ListItem
      disablePadding
      sx={{ px: 2 }}
      secondaryAction={
        isSelected && (
          <ListItemIcon>
            <CheckCircleIcon fontSize="large" color="primary" />
          </ListItemIcon>
        )
      }
    >
      <ListItemButton onClick={onClick} sx={{ py: 2 }}>
        <ListItemText
          primary={profession}
          slotProps={{ primary: { sx: { fontWeight: 600 } } }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SelectedProfessionItem;
