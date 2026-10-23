import { Box, ListItem, Skeleton, Stack } from "@mui/material";
import React from "react";

export const SearchUserItemSkeleton = () => {
  return (
    <ListItem disablePadding sx={{ py: 2, px: 2 }}>
      <Stack flexDirection="row" alignItems="center" width="100%">
        <Skeleton variant="circular" sx={styles.avatar} />

        <Box sx={{ ml: 2.5, flex: 1 }}>
          <Skeleton variant="text" width="55%" height={28} />
          <Skeleton variant="text" width="35%" height={22} />
        </Box>
      </Stack>
    </ListItem>
  );
};

const styles = {
  avatar: {
    width: { xs: 50, md: 70 },
    height: { xs: 50, md: 70 },
    flexShrink: 0,
  },
};
