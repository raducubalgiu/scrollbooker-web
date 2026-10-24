import React, { useState } from "react";
import Protected from "../Protected/Protected";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type ProductCardEditableActionsProps = {
  isLoadingDelete: boolean;
  displayEditableActions: boolean;
  onEditProduct: () => void;
  onDeleteProduct: () => void;
};

const ProductCardEditableActions = ({
  isLoadingDelete,
  displayEditableActions,
  onEditProduct,
  onDeleteProduct,
}: ProductCardEditableActionsProps) => {
  const [actionsAnchorEl, setActionsAnchorEl] = useState<HTMLElement | null>(
    null
  );

  return (
    <div>
      {displayEditableActions && (
        <Protected permission={PermissionEnum.PRODUCT_EDIT}>
          <IconButton
            size="large"
            onClick={(e) => {
              e.stopPropagation();
              setActionsAnchorEl(e.currentTarget);
            }}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={actionsAnchorEl}
            open={!!actionsAnchorEl}
            onClose={() => setActionsAnchorEl(null)}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuItem
              onClick={() => {
                setActionsAnchorEl(null);
                onEditProduct();
              }}
            >
              <ListItemIcon>
                <EditOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Editează</ListItemText>
            </MenuItem>

            <MenuItem
              disabled={isLoadingDelete}
              onClick={() => {
                setActionsAnchorEl(null);
                onDeleteProduct();
              }}
            >
              <ListItemIcon>
                <DeleteOutlineIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText sx={{ color: "error.main" }}>Șterge</ListItemText>
            </MenuItem>
          </Menu>
        </Protected>
      )}
    </div>
  );
};

export default ProductCardEditableActions;
