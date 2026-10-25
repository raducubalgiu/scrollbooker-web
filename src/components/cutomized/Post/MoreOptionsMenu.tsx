import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";
import { buildPostMoreOptionsItems } from "./postMoreOptionsItems";

type MoreOptionsMenuProps = {
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  handleOptionsClose: () => void;
  onStatisticsClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isLoadingDelete: boolean;
};

const MoreOptionsMenu = ({
  anchorEl,
  isMenuOpen,
  handleOptionsClose,
  onStatisticsClick,
  onEditClick,
  onDeleteClick,
  isLoadingDelete,
}: MoreOptionsMenuProps) => {
  const items = buildPostMoreOptionsItems({
    onStatisticsClick,
    onEditClick,
    onDeleteClick,
    isLoadingDelete,
  });

  return (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleOptionsClose}
      onClick={handleOptionsClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      slotProps={{
        paper: {
          sx: {
            mt: 1,
            borderRadius: 3,
            minWidth: 180,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          },
        },
      }}
    >
      {items.map((item) => (
        <MenuItem
          key={item.key}
          onClick={item.onClick}
          sx={{ py: 1.2, color: item.isDestructive ? "error.main" : undefined }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText
            primary={item.label}
            slotProps={{
              primary: {
                variant: "body2",
                fontWeight: 500,
              },
            }}
          />
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MoreOptionsMenu;
