import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import Protected from "@/components/cutomized/Protected/Protected";
import { useCustomQuery } from "@/hooks/useHttp";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { Product } from "@/ts/models/booking/product/Product";
import {
  Box,
  Divider,
  Stack,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import React, { memo } from "react";

type ExploreServicesTabProps = {
  postId: number | undefined;
};

const ExploreServicesTab = ({ postId }: ExploreServicesTabProps) => {
  const { data: products, isLoading } = useCustomQuery<Product[]>({
    key: ["post-linked-products", postId],
    url: `/api/posts/${postId}/linked-products`,
    options: {
      enabled: !!postId,
    },
  });

  return (
    <Box sx={styles.container}>
      <Box sx={styles.listContainer}>
        {isLoading && (
          <Stack alignItems="center" justifyContent="center" py={4}>
            <CircularProgress />
          </Stack>
        )}

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

        {!isLoading && isEmpty(products) && (
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
