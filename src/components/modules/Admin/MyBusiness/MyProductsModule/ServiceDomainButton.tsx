import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";

type ServiceDomainButtonProps = {
  serviceDomainId: number | null;
  onSetServiceDomain: (s: number | null) => void;
};

const SERVICE_DOMAINS = [
  {
    id: 26,
    name: "Par si Barba",
  },
  {
    id: 29,
    name: "Unghii",
  },
  {
    id: 27,
    name: "Sprancene si Gene",
  },
];

const ServiceDomainButton: React.FC<ServiceDomainButtonProps> = ({
  serviceDomainId,
  onSetServiceDomain,
}) => {
  const [anchorServiceDomainEl, setAnchorServiceDomainEl] =
    React.useState<null | HTMLElement>(null);
  const serviceDomainOpen = Boolean(anchorServiceDomainEl);

  const handleServiceDomainClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorServiceDomainEl(event.currentTarget);
  };
  const handleServiceDomainClose = () => setAnchorServiceDomainEl(null);

  const selectedServiceDomain =
    SERVICE_DOMAINS.find((sd) => sd.id === serviceDomainId) ?? null;

  return (
    <div>
      <Button
        id="service-domain-filter-button"
        aria-controls={
          serviceDomainOpen ? "service-domain-filter-menu" : undefined
        }
        aria-haspopup="true"
        aria-expanded={serviceDomainOpen ? "true" : undefined}
        variant="outlined"
        size="large"
        color={serviceDomainId ? "primary" : "secondary"}
        disableElevation
        onClick={handleServiceDomainClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {selectedServiceDomain ? selectedServiceDomain.name : "Categoria"}
      </Button>
      <Menu
        id="service-domain-filter-menu"
        slotProps={{
          list: { "aria-labelledby": "service-domain-filter-button" },
        }}
        anchorEl={anchorServiceDomainEl}
        open={serviceDomainOpen}
        onClose={handleServiceDomainClose}
      >
        <MenuItem
          onClick={() => {
            onSetServiceDomain(null);
            handleServiceDomainClose();
          }}
          selected={serviceDomainId === null}
          disableRipple
        >
          Toate tipurile
        </MenuItem>

        {SERVICE_DOMAINS.map((sd) => (
          <MenuItem
            key={sd.id}
            onClick={() => {
              onSetServiceDomain(sd.id);
              handleServiceDomainClose();
            }}
            selected={serviceDomainId === sd.id}
            disableRipple
          >
            {sd.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ServiceDomainButton;
