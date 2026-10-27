import { Box, Drawer, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PostLinkedProductsList from "@/components/cutomized/Post/sheets/PostLinkedProductsList";
import { LinkedProducts } from "@/ts/models/booking/product/LinkedProducts";
import LinkedProductsUserInfo from "./LinkedProductsUserInfo";

type PostLinkedProductsSheetProps = {
  open: boolean;
  onClose: () => void;
  distanceKm: number | null;
  linkedProducts: LinkedProducts | undefined;
  isLoadingLinkedProducts: boolean;
  isLoadingPosts: boolean;
  instantBooking: boolean;
  onNavigateToBooking: (prodId: number | null) => void;
};

const PostLinkedProductsSheet = ({
  open,
  onClose,
  distanceKm,
  linkedProducts,
  isLoadingLinkedProducts,
  isLoadingPosts,
  instantBooking,
  onNavigateToBooking,
}: PostLinkedProductsSheetProps) => {
  const { business, products } = linkedProducts || {};
  const hasNoProducts =
    !isLoadingLinkedProducts &&
    !isLoadingPosts &&
    !!products &&
    products.length === 0;

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
          sx={{ py: 1 }}
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
        {business && !hasNoProducts && (
          <LinkedProductsUserInfo
            avatar={business.avatar ?? ""}
            fullname={business.fullname}
            ratingsAverage={business.ratings_average}
            ratingsCount={business.ratings_count}
            address={business.address ?? ""}
            distanceKm={distanceKm}
          />
        )}

        <PostLinkedProductsList
          linkedProducts={linkedProducts}
          isLoadingLinkedProducts={isLoadingLinkedProducts}
          isLoadingPosts={isLoadingPosts}
          instantBooking={instantBooking}
          onNavigateToBooking={onNavigateToBooking}
        />
      </Box>
    </Drawer>
  );
};

export default PostLinkedProductsSheet;

const styles = {
  drawer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "80vh",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    width: "100%",
    flexShrink: 0,
  },
  iconBack: {
    position: "absolute",
    right: 0,
    color: "text.secondary",
  },
  listContainer: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    px: 0.5,
    WebkitOverflowScrolling: "touch",
  },
};
