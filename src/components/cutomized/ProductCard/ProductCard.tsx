import { Product, ProductUtils } from "@/ts/models/booking/product/Product";
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  SxProps,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useState } from "react";
import Protected from "../Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { SelectedBookingItem } from "@/components/modules/Marketplace/BookingModule/BookingModule";
import { formatPrice } from "@/utils/formatPrice";

type ProductCardProps = {
  product: Product;
  isSelected: boolean;
  showIcon: boolean;
  showDescription?: boolean;
  expandDescriptionOnClick?: boolean;
  displayEditableActions?: boolean;
  isLoadingDelete?: boolean;
  onOpenDetail?: () => void;
  onAdd: (item: SelectedBookingItem) => void;
  onNavigateToBooking: (product: Product) => void;
  onEditProduct?: (productId: number) => void;
  onDeleteProduct?: (productId: number) => void;
  sx?: SxProps<Theme>;
};

const ProductCard = ({
  product,
  isSelected,
  showIcon,
  showDescription = true,
  expandDescriptionOnClick = false,
  displayEditableActions = false,
  isLoadingDelete = false,
  onOpenDetail,
  onAdd,
  onNavigateToBooking,
  onEditProduct,
  onDeleteProduct,
  sx = {},
}: ProductCardProps) => {
  const { name, description, starting_offering, has_different_prices } =
    product;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [actionsAnchorEl, setActionsAnchorEl] = useState<HTMLElement | null>(
    null
  );

  const handleCardClick = () => {
    if (expandDescriptionOnClick) {
      setIsDescriptionExpanded((prev) => !prev);
      return;
    }
    onOpenDetail?.();
  };

  const filtersText = ProductUtils.getFiltersSummary(product);
  const durationText = ProductUtils.getDurationText(starting_offering.duration);
  const summaryText = filtersText
    ? `${durationText} • ${filtersText}`
    : durationText;

  const onSelectProduct = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (isSelected) {
      onAdd({
        productId: product.id,
      } as SelectedBookingItem);
      return;
    }

    const variants = product.variants || [];
    if (variants.length > 1) {
      onOpenDetail?.();
      return;
    }

    const firstVariant = variants[0];

    if (firstVariant) {
      onAdd({
        productId: product.id,
        variantId: firstVariant.id,
        variantDuration: firstVariant.duration,
        offerings: firstVariant.offerings,
        productName: product.name,
        variantName: firstVariant.name,
      });
    }
  };

  return (
    <Box
      sx={[
        {
          bgcolor: "background.default",
          p: 2.5,
          borderRadius: 2.5,
          border: 1.5,
          borderColor: "divider",
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: "background.paper",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      onClick={handleCardClick}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            fontWeight={700}
            noWrap
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {summaryText}
          </Typography>

          <Stack flexDirection="row" alignItems="center" gap={1} mt={1.5}>
            <Typography fontSize={{ xs: 17, lg: 18 }} fontWeight={600}>
              {has_different_prices && "de la"}{" "}
              {`${formatPrice(starting_offering.price_with_discount)} RON`}
            </Typography>
            {starting_offering.discount > 0 && (
              <>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  {formatPrice(starting_offering.price)}
                </Typography>
                <Typography fontWeight={600} color="error.main">
                  (-{starting_offering.discount}%)
                </Typography>
              </>
            )}
          </Stack>
        </Box>

        {!displayEditableActions && (
          <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
            {showIcon ? (
              <IconButton size="large" onClick={onSelectProduct}>
                {isSelected ? (
                  <Tooltip title="Elimină">
                    <CheckCircleRoundedIcon fontSize="large" color="primary" />
                  </Tooltip>
                ) : (
                  <Tooltip title="Adaugă">
                    <AddRoundedIcon fontSize="large" />
                  </Tooltip>
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
                  onNavigateToBooking(product);
                }}
              >
                Rezervă
              </Button>
            )}
          </Protected>
        )}

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
                  onEditProduct?.(product.id);
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
                  onDeleteProduct?.(product.id);
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
      </Stack>

      {description && showDescription && (
        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
          sx={
            expandDescriptionOnClick
              ? {
                  whiteSpace: "pre-line",
                  overflow: "hidden",
                  maxHeight: isDescriptionExpanded ? 1000 : 45,
                  transition: "max-height 0.3s ease",
                }
              : {
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 200,
                }
          }
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default ProductCard;
