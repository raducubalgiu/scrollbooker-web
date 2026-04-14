import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import ProductCardSkeleton from "@/components/cutomized/ProductCard/ProductCardSkeleton";
import { useCustomQuery } from "@/hooks/useHttp";
import { Product } from "@/ts/models/booking/product/Product";
import { Box, Divider, Button, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React, { memo, useMemo } from "react";

type ExploreServicesTabProps = {
  postId: number | undefined;
  isLoadingPosts: boolean;
};

const ExploreServicesTab = ({
  postId,
  isLoadingPosts,
}: ExploreServicesTabProps) => {
  const { data: products, isLoading } = useCustomQuery<Product[]>({
    key: ["post-linked-products", postId],
    url: `/api/posts/${postId}/linked-products`,
    options: {
      enabled: !!postId,
    },
  });

  const skeletons = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, index) => {
        return (
          <Box key={index}>
            <ProductCardSkeleton />
            {index < 2 && <Divider sx={{ my: 1.5 }} />}
          </Box>
        );
      }),
    []
  );

  return (
    <Box sx={styles.container}>
      <Box sx={styles.listContainer}>
        {(isLoading || isLoadingPosts) && skeletons}

        {!isLoading &&
          products?.map((prod, i) => (
            <Box key={prod.id}>
              <ProductCard product={prod} isSelected={i === 0} />

              {i < products?.length - 1 && <Divider sx={{ my: 1.5 }} />}
            </Box>
          ))}

        {!isLoading && !isEmpty(products) && (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ textTransform: "none", mt: 2.5 }}
          >
            Toate serviciile
          </Button>
        )}

        {!isLoading && products?.length === 0 && (
          <Typography color="text.secondary">
            Nu există servicii momentan.
          </Typography>
        )}
      </Box>

      {/* <Box sx={{ p: 2 }}>
        <Divider />

        <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
            size="large"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: 17,
              py: 1.5,
            }}
          >
            Rezervă acum
          </Button>
        </Protected>
      </Box> */}
    </Box>
  );
};

export default memo(ExploreServicesTab);

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    height: "100%",
  },
  listContainer: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    p: 3,
    scrollBarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
};
