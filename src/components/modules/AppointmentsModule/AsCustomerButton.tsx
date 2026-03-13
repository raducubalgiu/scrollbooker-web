import { DropdownMenu } from "@/components/cutomized/DropdownMenu/DropdownMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Menu, MenuItem, Theme } from "@mui/material";
import React from "react";

type AsCustomerButtonProps = {
  asCustomer: boolean | null;
  onSetAsCustomer: (s: boolean | null) => void;
  theme: Theme;
};

const AsCustomerButton: React.FC<AsCustomerButtonProps> = ({
  asCustomer,
  onSetAsCustomer,
  theme,
}) => {
  const [anchorAsCustomerEl, setAnchorAsCustomerEl] =
    React.useState<null | HTMLElement>(null);
  const asCustomerOpen = Boolean(anchorAsCustomerEl);

  const handleAsCustomerClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAsCustomerEl(event.currentTarget);
  };
  const handleAsCustomerClose = () => setAnchorAsCustomerEl(null);

  function getAsCustomerLabel(asCustomer: boolean | null | undefined): string {
    switch (asCustomer) {
      case true:
        return "Doar ca și client";
      case false:
        return "Doar ca și angajat";
      default:
        return "Toate rezervările";
    }
  }

  return (
    <div>
      <Button
        id="as-customer-button"
        aria-controls={asCustomerOpen ? "as-customer-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={asCustomerOpen ? "true" : undefined}
        variant="outlined"
        size="large"
        color={asCustomer !== null ? "primary" : "secondary"}
        disableElevation
        onClick={handleAsCustomerClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {getAsCustomerLabel(asCustomer)}
      </Button>
      <Menu
        id="as-customer-menu"
        slotProps={{
          list: { "aria-labelledby": "as-customer-button" },
        }}
        anchorEl={anchorAsCustomerEl}
        open={asCustomerOpen}
        onClose={handleAsCustomerClose}
      >
        <MenuItem
          onClick={() => {
            onSetAsCustomer(null);
            handleAsCustomerClose();
          }}
          selected={asCustomer === null}
          disableRipple
        >
          Toate
        </MenuItem>

        <MenuItem
          onClick={() => {
            onSetAsCustomer(true);
            handleAsCustomerClose();
          }}
          selected={asCustomer === true}
          disableRipple
        >
          Doar ca și client
        </MenuItem>

        <MenuItem
          onClick={() => {
            onSetAsCustomer(false);
            handleAsCustomerClose();
          }}
          selected={asCustomer === false}
          disableRipple
        >
          Doar ca și angajat
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AsCustomerButton;
