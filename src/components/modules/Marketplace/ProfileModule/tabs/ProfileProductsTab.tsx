"use client";

import { Box } from "@mui/material";
import React, { memo } from "react";

type ProfileProductsTabProps = {
  businessId: number | null;
  userId: number;
};

//const SCROLL_OFFSET = 80;
const SIDEBAR_WIDTH = 650;

const ProfileProductsTab = ({
  businessId,
  userId,
}: ProfileProductsTabProps) => {
  console.log(businessId);
  console.log(userId);

  // const { data } = useCustomQuery<UserProducts>({
  //   key: ["business-products", !!businessId, userId],
  //   url: businessId ? `/api/businesses/${businessId}/products` : "",
  //   options: { enabled: !!businessId },
  // });

  // const businessProducts = useMemo(() => data ?? [], [data]);
  // const sync = useScrollSync(businessProducts, SCROLL_OFFSET);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: `minmax(0, 1fr) ${SIDEBAR_WIDTH}px`,
        },
        gap: { xs: 3, md: 6, lg: 8 },
        alignItems: "start",
      }}
    >
      {/* <ProductsStep
        sync={sync}
        businessProducts={businessProducts}
        scrollOffset={SCROLL_OFFSET}
        displayTitle={false}
        top={0}
      />

      <BookingSidebar /> */}
    </Box>
  );
};

export default memo(ProfileProductsTab);
