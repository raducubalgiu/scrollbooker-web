import { Button, IconButton } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Protected from "../Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

type ProductCardSelectActionsProps = {
  isSelected: boolean;
  showIcon: boolean;
  instantBooking: boolean;
  displayEditableActions: boolean;
  onSelectProduct: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onNavigateToBooking: () => void;
};

const ProductCardSelectActions = ({
  isSelected,
  showIcon,
  displayEditableActions,
  instantBooking,
  onSelectProduct,
  onNavigateToBooking,
}: ProductCardSelectActionsProps) => {
  return (
    <>
      {!displayEditableActions && instantBooking && (
        <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
          {showIcon ? (
            <IconButton
              size="medium"
              onClick={onSelectProduct}
              sx={{
                width: { xs: 40, md: 46 },
                height: { xs: 40, md: 46 },
                bgcolor: isSelected ? "primary.main" : "background.default",
                color: isSelected ? "common.white" : "text.primary",
                boxShadow: isSelected ? 0 : 2,
                transition: "all 0.2s ease-in-out",

                "&:hover": {
                  bgcolor: isSelected ? "primary.dark" : "action.hover",
                  boxShadow: isSelected ? 6 : 4,
                  transform: "scale(1.05)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            >
              {isSelected ? (
                <CheckRoundedIcon sx={{ fontSize: { xs: 22, md: 24 } }} />
              ) : (
                <AddRoundedIcon sx={{ fontSize: { xs: 22, md: 24 } }} />
              )}
            </IconButton>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              disableElevation
              onClick={(e) => {
                e.stopPropagation();
                onNavigateToBooking();
              }}
            >
              Rezervă
            </Button>
          )}
        </Protected>
      )}
    </>
  );
};

export default ProductCardSelectActions;
