import {
  SelectedService,
  SelectedServiceDomainWithServices,
} from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";

type ServiceButtonProps = {
  serviceId: number | null;
  onSetService: (s: number | null) => void;
  serviceDomainServices: SelectedServiceDomainWithServices[];
  isLoadingServices: boolean;
};

const ServiceButton: React.FC<ServiceButtonProps> = ({
  serviceId,
  onSetService,
  serviceDomainServices,
  isLoadingServices,
}) => {
  const [anchorServiceEl, setAnchorServiceEl] =
    React.useState<null | HTMLElement>(null);
  const serviceOpen = Boolean(anchorServiceEl);

  const handleServiceClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorServiceEl(event.currentTarget);
  };
  const handleServiceClose = () => setAnchorServiceEl(null);

  const allSelectedServices: SelectedService[] = serviceDomainServices.flatMap(
    (domain) =>
      domain.services.filter((service) => service.is_selected === true)
  );

  const selectedService =
    allSelectedServices.find((s) => s.id === serviceId) ?? null;

  return (
    <div>
      <Button
        id="service-filter-button"
        aria-controls={serviceOpen ? "service-filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={serviceOpen ? "true" : undefined}
        variant="outlined"
        size="large"
        color={serviceId ? "primary" : "secondary"}
        disableElevation
        onClick={handleServiceClick}
        endIcon={<KeyboardArrowDownIcon />}
        disabled={isLoadingServices}
      >
        {selectedService ? selectedService.name : "Serviciu"}
      </Button>
      <Menu
        id="service-filter-menu"
        slotProps={{
          list: { "aria-labelledby": "service-filter-button" },
        }}
        anchorEl={anchorServiceEl}
        open={serviceOpen}
        onClose={handleServiceClose}
      >
        <MenuItem
          onClick={() => {
            onSetService(null);
            handleServiceClose();
          }}
          selected={serviceId === null}
          disableRipple
        >
          Toate tipurile
        </MenuItem>

        {allSelectedServices.map((s) => (
          <MenuItem
            key={s.id}
            onClick={() => {
              onSetService(s.id);
              handleServiceClose();
            }}
            selected={serviceId === s.id}
            disableRipple
          >
            {s.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ServiceButton;
