import { Box, Paper, Skeleton, Stack } from "@mui/material";
import React from "react";

const MyServicesSkeleton = ({ rows = 6 }: { rows?: number }) => {
  return (
    <Box>
      {Array.from({ length: 2 }).map((_, sectionIdx) => (
        <Paper key={sectionIdx} sx={{ mb: 1, p: 2.5 }}>
          <Skeleton variant="text" width={100} height={28} sx={{ mb: 2.5 }} />

          {Array.from({ length: rows }).map((__, idx) => (
            <Stack
              key={idx}
              flexDirection="row"
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{
                bgcolor: "background.default",
                mb: 1,
                p: 1.5,
                borderRadius: 1,
              }}
            >
              <Skeleton variant="text" width={100} height={25} />
              <Skeleton variant="text" width={25} height={25} />
            </Stack>
          ))}
        </Paper>
      ))}
    </Box>
  );
};

export default MyServicesSkeleton;
