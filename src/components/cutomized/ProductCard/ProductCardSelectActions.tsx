import React from "react";
import { Button, IconButton } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Protected from "../Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

export type ProductCardSelection = {
  isSelected: boolean;
  disabled?: boolean;
  onToggle: () => void;
};

type ProductCardSelectActionsProps = {
  selection?: ProductCardSelection | undefined;
  onBook?: (() => void) | undefined;
};

const ProductCardSelectActions = ({
  selection,
  onBook,
}: ProductCardSelectActionsProps) => {
  if (selection) {
    const { isSelected, disabled = false, onToggle } = selection;

    return (
      <IconButton
        size="medium"
        disabled={disabled}
        aria-label={isSelected ? "Elimină serviciul" : "Adaugă serviciul"}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        sx={[styles.toggle, isSelected && styles.toggleSelected]}
      >
        {isSelected ? (
          <CheckRoundedIcon sx={styles.icon} />
        ) : (
          <AddRoundedIcon sx={styles.icon} />
        )}
      </IconButton>
    );
  }

  if (!onBook) return null;

  return (
    <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
      <Button
        variant="outlined"
        color="neutral"
        size="small"
        disableElevation
        onClick={(e) => {
          e.stopPropagation();
          onBook();
        }}
      >
        Rezervă
      </Button>
    </Protected>
  );
};

export default ProductCardSelectActions;

const styles = {
  toggle: {
    flexShrink: 0,
    width: { xs: 40, md: 46 },
    height: { xs: 40, md: 46 },
    bgcolor: "background.default",
    color: "text.primary",
    boxShadow: 2,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      bgcolor: "action.hover",
      boxShadow: 4,
      transform: "scale(1.05)",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  },
  toggleSelected: {
    bgcolor: "primary.main",
    color: "common.white",
    boxShadow: 0,
    "&:hover": {
      bgcolor: "primary.dark",
      boxShadow: 6,
      transform: "scale(1.05)",
    },
  },
  icon: {
    fontSize: { xs: 22, md: 24 },
  },
};
