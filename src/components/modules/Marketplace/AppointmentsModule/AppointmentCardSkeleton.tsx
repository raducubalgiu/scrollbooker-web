import { Box, Divider, Skeleton, Stack } from "@mui/material";
import React from "react";

const AppointmentCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Box key={index}>
          <Stack p={3}>
            <Stack sx={{ width: "100%" }}>
              <Skeleton variant="rounded" width={100} height={15} />

              <Box sx={{ height: 24 }} />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{ width: "100%" }}
                spacing={1}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Skeleton variant="circular" width={55} height={55} />
                    <Box>
                      <Skeleton
                        variant="rounded"
                        width={150}
                        height={15}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton variant="rounded" width={150} height={15} />
                    </Box>
                  </Stack>

                  <Box sx={{ height: 16 }} />

                  <Skeleton variant="rounded" width={200} height={15} />

                  <Box sx={{ height: 8 }} />

                  <Skeleton variant="rounded" width={60} height={15} />

                  <Box sx={{ height: 8 }} />

                  <Skeleton variant="rounded" width={250} height={15} />
                </Box>

                <Skeleton
                  variant="rounded"
                  width={80}
                  height={90}
                  sx={{ borderRadius: 5 }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Divider sx={{ my: 1.5 }} />
        </Box>
      ))}
    </>
  );
};

export default AppointmentCardSkeleton;
