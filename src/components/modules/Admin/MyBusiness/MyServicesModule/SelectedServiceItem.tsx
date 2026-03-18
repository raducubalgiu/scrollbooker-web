import { SelectedService } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";

type SelectedServiceItemProps = {
  service: SelectedService;
  isSelected: boolean;
  onSetSelected: (serviceId: number) => void;
};

const SelectedServiceItem = ({
  service,
  isSelected,
  onSetSelected,
}: SelectedServiceItemProps) => {
  return (
    <ListItem
      key={service.id}
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={() => onSetSelected(service.id)}
          checked={isSelected}
          slotProps={{
            input: {
              "aria-labelledby": `${service.id}`,
            },
          }}
        />
      }
      disablePadding
    >
      <ListItemButton
        sx={{ bgcolor: "background.default", mb: 0.5 }}
        onClick={() => onSetSelected(service.id)}
      >
        <ListItemText
          id={`${service.id}`}
          primary={service.name}
          slotProps={{ primary: { sx: { fontSize: 16, fontWeight: 600 } } }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SelectedServiceItem;
