import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ProductCardSkeleton from "@/components/cutomized/ProductCard/ProductCardSkeleton";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import { isEmpty } from "lodash";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { LinkedProducts } from "@/ts/models/booking/product/LinkedProducts";
import LinkedProductsUserInfo from "./LinkedProductsUserInfo";

type PostLinkedProductsSheetProps = {
  open: boolean;
  onClose: () => void;
  linkedProducts: LinkedProducts | undefined;
  isLoadingLinkedProducts: boolean;
  isLoadingPosts: boolean;
  onNavigateToBooking: (prodId: number | null) => void;
};

const PostLinkedProductsSheet = ({
  open,
  onClose,
  linkedProducts,
  isLoadingLinkedProducts,
  isLoadingPosts,
  onNavigateToBooking,
}: PostLinkedProductsSheetProps) => {
  const { business } = linkedProducts || {};

  const skeletons = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, index) => {
        return (
          <Box key={index}>
            <ProductCardSkeleton />
            {index < 4 && <Divider sx={{ my: 1.5 }} />}
          </Box>
        );
      }),
    []
  );

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{ display: { xs: "block", lg: "none" } }}
      slotProps={{
        paper: { sx: styles.drawer },
      }}
    >
      <Box sx={styles.container}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          position="relative"
          mx={2}
          minHeight={30}
        >
          <Typography fontWeight={800} fontSize={16}>
            Servicii recomandate
          </Typography>

          <IconButton onClick={onClose} size="small" sx={styles.iconBack}>
            <CloseIcon fontSize="medium" sx={{ color: "text.primary" }} />
          </IconButton>
        </Stack>
      </Box>

      {business && (
        <LinkedProductsUserInfo
          avatar={business.avatar ?? ""}
          fullname={business.fullname}
          ratingsAverage={business.ratings_average}
          ratingsCount={business.ratings_count}
          address={business.address ?? ""}
        />
      )}

      <Box sx={styles.listContainer}>
        {(isLoadingLinkedProducts || isLoadingPosts) && skeletons}

        {!isLoadingLinkedProducts &&
          linkedProducts?.products.map((prod, i) => (
            <Box key={prod.id}>
              <ProductCard
                product={prod}
                isSelected={false}
                showIcon={false}
                showDescription={false}
                onOpenDetail={() => {}}
                onNavigateToBooking={() => onNavigateToBooking(prod.id)}
                sx={{ borderColor: "transparent", p: 1.5 }}
                onAdd={() => {}}
              />

              {i < linkedProducts.products.length - 1 && (
                <Divider sx={{ my: 1 }} />
              )}
            </Box>
          ))}

        {!isLoadingLinkedProducts && !isEmpty(linkedProducts) && (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={{ m: 1.5 }}
            onClick={() => onNavigateToBooking(null)}
          >
            Vezi toate serviciile
          </Button>
        )}

        {!isLoadingLinkedProducts && linkedProducts?.products.length === 0 && (
          <NotFound
            title="Servicii"
            description="Nu există servicii momentan"
            icon={<ShoppingBagOutlinedIcon fontSize="large" />}
          />
        )}
      </Box>
    </Drawer>
  );
};

export default PostLinkedProductsSheet;

const styles = {
  drawer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "75vh",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    width: "100%",
    py: 1,
    flexShrink: 0,
  },
  iconBack: {
    position: "absolute",
    right: 0,
    color: "text.secondary",
  },
  listContainer: {
    flexGrow: 1,
    overflowY: "auto",
    px: 0.5,
    WebkitOverflowScrolling: "touch",
  },
};
