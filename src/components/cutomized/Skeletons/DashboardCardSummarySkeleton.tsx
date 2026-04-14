import React from "react";
import { Paper, Typography, Skeleton, Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

type DashboardCardSummarySkeletonProps = { count?: number };

export default function DashboardCardSummarySkeleton({
  count = 4,
}: DashboardCardSummarySkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Grid size={3} key={i}>
          <Paper sx={{ borderRadius: 1.5, padding: 2.5 }}>
            <Typography>
              <Skeleton />
            </Typography>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 1.5 }}
            >
              <Skeleton sx={{ width: 100 }} />
              <Box>
                <Skeleton sx={{ width: 100 }} />
                <Skeleton sx={{ width: 100 }} />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </>
  );
}
