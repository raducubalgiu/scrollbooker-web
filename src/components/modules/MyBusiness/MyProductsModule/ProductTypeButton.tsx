import {
  getProductTypeLabel,
  ProductTypeEnum,
} from "@/ts/enums/ProductTypeEnum";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Menu, MenuItem, Theme } from "@mui/material";
import React from "react";

type ProductTypeButtonProps = {
  type: ProductTypeEnum | null;
  onSetType: (s: ProductTypeEnum | null) => void;
  theme: Theme;
};

const ProductTypeButton: React.FC<ProductTypeButtonProps> = ({
  type,
  onSetType,
  theme,
}) => {
  const [anchorTypeEl, setAnchorTypeEl] = React.useState<null | HTMLElement>(
    null
  );
  const typeOpen = Boolean(anchorTypeEl);

  const handleTypeClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorTypeEl(event.currentTarget);
  };
  const handleTypeClose = () => setAnchorTypeEl(null);

  return (
    <div>
      <Button
        id="type-filter-button"
        aria-controls={typeOpen ? "type-filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={typeOpen ? "true" : undefined}
        variant="outlined"
        size="large"
        color={type ? "primary" : "secondary"}
        disableElevation
        onClick={handleTypeClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {type ? getProductTypeLabel(type) : "Tip produs"}
      </Button>
      <Menu
        id="type-filter-menu"
        slotProps={{
          list: { "aria-labelledby": "type-filter-button" },
        }}
        anchorEl={anchorTypeEl}
        open={typeOpen}
        onClose={handleTypeClose}
      >
        <MenuItem
          onClick={() => {
            onSetType(null);
            handleTypeClose();
          }}
          selected={type === null}
          disableRipple
        >
          Toate tipurile
        </MenuItem>

        {ProductTypeEnum.all.map((s) => (
          <MenuItem
            key={s}
            onClick={() => {
              onSetType(s);
              handleTypeClose();
            }}
            selected={type === s}
            disableRipple
          >
            {getProductTypeLabel(s)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ProductTypeButton;
