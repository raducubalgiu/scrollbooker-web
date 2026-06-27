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
import { Product } from "@/ts/models/booking/product/Product";
import ProductCardSkeleton from "@/components/cutomized/ProductCard/ProductCardSkeleton";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import { isEmpty } from "lodash";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

type ExploreLinkedProductsSheetProps = {
  open: boolean;
  onClose: () => void;
  linkedProducts: Product[];
  isLoadingLinkedProducts: boolean;
  isLoadingPosts: boolean;
};

const ExploreLinkedProductsSheet = ({
  open,
  onClose,
  linkedProducts,
  isLoadingLinkedProducts,
  isLoadingPosts,
}: ExploreLinkedProductsSheetProps) => {
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

      <Box sx={styles.listContainer}>
        {(isLoadingLinkedProducts || isLoadingPosts) && skeletons}

        {!isLoadingLinkedProducts &&
          linkedProducts?.map((prod, i) => (
            <Box key={prod.id}>
              <ProductCard
                product={prod}
                isSelected={false}
                showIcon={false}
                showDescription={false}
                onOpenDetail={() => {}}
                onNavigateToBooking={() => {}}
                sx={{ borderColor: "transparent", p: 1.5 }}
                onAdd={() => {}}
              />

              {i < linkedProducts?.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))}

        {!isLoadingLinkedProducts && !isEmpty(linkedProducts) && (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            sx={{
              ml: 1.5,
              mt: 1.5,
              mb: 2.5,
              px: 2.5,
              fontSize: { xs: 14, lg: 16 },
            }}
            onClick={() => {}}
          >
            Vezi toate serviciile
          </Button>
        )}

        {!isLoadingLinkedProducts && linkedProducts?.length === 0 && (
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

export default ExploreLinkedProductsSheet;

const styles = {
  drawer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "background.paper",
    height: "75vh",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    width: "100%",
    pt: 2,
    pb: 1.5,
    borderBottom: 1,
    borderColor: "divider",
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
