import {
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import React from "react";

type MoreOptionsMenuProps = {
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  isOwnPost: boolean;
  handleOptionsClose: () => void;
  onReportClick: () => void;
  onDeleteClick: () => void;
  isLoadingDelete: boolean;
};

const MoreOptionsMenu = ({
  anchorEl,
  isMenuOpen,
  isOwnPost,
  handleOptionsClose,
  onReportClick,
  onDeleteClick,
  isLoadingDelete,
}: MoreOptionsMenuProps) => {
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
            minWidth: 160,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          },
        },
      }}
    >
      <MenuItem onClick={onReportClick} sx={{ py: 1.2 }}>
        <ListItemIcon>
          <ReportOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Raportează"
          slotProps={{
            primary: {
              variant: "body2",
              fontWeight: 500,
            },
          }}
        />
      </MenuItem>

      {isOwnPost && (
        <MenuItem onClick={onDeleteClick} sx={{ color: "error.main", py: 1.2 }}>
          <ListItemIcon>
            {isLoadingDelete ? (
              <CircularProgress />
            ) : (
              <DeleteOutlineIcon fontSize="small" color="error" />
            )}
          </ListItemIcon>
          <ListItemText
            primary="Șterge"
            slotProps={{
              primary: {
                variant: "body2",
                fontWeight: 500,
              },
            }}
          />
        </MenuItem>
      )}
    </Menu>
  );
};

export default MoreOptionsMenu;
