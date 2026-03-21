import React, { useMemo } from "react";
import { Box, Checkbox, Stack, styled, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

type RatingsDistributionProps = {
  // keys 1..5
  counts?: Record<number, number>;
};

const DEFAULT_COUNTS: Record<number, number> = {
  5: 120,
  4: 45,
  3: 20,
  2: 8,
  1: 3,
};

const RatingsDistribution = ({
  counts = DEFAULT_COUNTS,
}: RatingsDistributionProps) => {
  const total = useMemo(
    () => Object.values(counts).reduce((a, b) => a + b, 0),
    [counts]
  );

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles("dark", {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: "primary.main",
    },
  }));

  const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[500]
        : theme.palette.grey[400],
    "&.Mui-checked": {
      color: theme.palette.primary.main,
    },
    padding: 6,
  }));

  return (
    <Box>
      {[5, 4, 3, 2, 1].map((star) => {
        const count = counts[star] ?? 0;
        const percent = total > 0 ? (count / total) * 100 : 0;

        return (
          <Stack key={star} direction="row" alignItems="center" spacing={2}>
            <StyledCheckbox size="large" checked={false} />

            <Typography
              variant="h6"
              sx={{ width: 28, textAlign: "center", fontWeight: 600 }}
            >
              {star}
            </Typography>

            <Box sx={{ flex: 1, mx: 1 }}>
              <BorderLinearProgress variant="determinate" value={percent} />
            </Box>

            <Typography
              variant="h6"
              sx={{ width: 56, textAlign: "right", fontWeight: 600 }}
            >
              {count}
            </Typography>
          </Stack>
        );
      })}
    </Box>
  );
};

export default RatingsDistribution;
