import { Box, Skeleton, Stack } from "@mui/material";
import React, { memo } from "react";
import { SxProps, Theme } from "@mui/material/styles";

type BusinessCardSkeletonsProps = {
  listSx: SxProps<Theme>;
};

const BusinessCardSkeletons = ({ listSx }: BusinessCardSkeletonsProps) => {
  return (
    <Box sx={listSx}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Box key={i}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 0, sm: 280 },
              paddingTop: { xs: "56.25%", sm: 0 },
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <Skeleton
              variant="rounded"
              width="100%"
              height="100%"
              sx={{
                position: { xs: "absolute", sm: "relative" },
                inset: 0,
              }}
            />
          </Box>

          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt={{ xs: 1, sm: 2 }}
          >
            <Skeleton
              variant="rounded"
              width={100}
              sx={{
                mb: 1,
                height: { xs: 18, sm: 22.5 },
              }}
            />
            <Skeleton
              variant="rounded"
              width={50}
              sx={{
                height: { xs: 18, sm: 20 },
              }}
            />
          </Stack>

          <Skeleton
            variant="rounded"
            width={200}
            sx={{
              height: { xs: 13, sm: 15 },
            }}
          />

          <Skeleton
            variant="rounded"
            width="100%"
            sx={{
              mt: { xs: 1, sm: 2.5 },
              mb: { xs: 1.5, sm: 2.5 },
              height: { xs: 13, sm: 15 },
            }}
          />

          <Skeleton
            variant="rounded"
            width="100%"
            sx={{
              mt: 2.5,
              borderRadius: 4,
              height: { xs: 66, sm: 75 },
            }}
          />

          <Skeleton
            variant="rounded"
            width="100%"
            sx={{
              mt: 1.5,
              mb: 2.5,
              borderRadius: 4,
              height: { xs: 66, sm: 75 },
            }}
          />

          <Skeleton
            variant="rounded"
            width="100%"
            sx={{
              mb: 2.5,
              borderRadius: 4,
              height: { xs: 66, sm: 75 },
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default memo(BusinessCardSkeletons);
