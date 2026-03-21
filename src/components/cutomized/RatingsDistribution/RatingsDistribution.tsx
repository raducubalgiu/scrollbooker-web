import React, { useMemo, memo } from "react";
import { Box, Checkbox, Stack, styled, Typography } from "@mui/material";
import type { ReviewsSummaryType } from "@/ts/models/booking/reviews/ReviewsSummaryType";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

type RatingsDistributionProps = {
  summary: ReviewsSummaryType | undefined;
  selectedRatings?: Set<number>;
  onRatingClick?: (rating: number) => void;
};

const RatingsDistribution = ({
  summary,
  selectedRatings,
  onRatingClick,
}: RatingsDistributionProps) => {
  const breakdown = useMemo(() => {
    if (!summary || !Array.isArray(summary.breakdown))
      return [] as ReviewsSummaryType["breakdown"];
    return [...summary.breakdown].sort((a, b) => b.rating - a.rating);
  }, [summary]);

  const counts = useMemo(() => {
    const map: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    breakdown.forEach((b) => {
      if (typeof b.rating === "number" && typeof b.count === "number") {
        map[b.rating] = b.count;
      }
    });
    return map;
  }, [breakdown]);

  const total = useMemo(() => {
    if (summary && typeof summary.ratings_count === "number")
      return summary.ratings_count;
    return Object.values(counts).reduce((a, b) => a + b, 0);
  }, [summary, counts]);

  const maxCount = useMemo(() => {
    if (!breakdown || breakdown.length === 0) return 1;
    return Math.max(...breakdown.map((b) => b.count), 1);
  }, [breakdown]);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 7.5,
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
      {breakdown.map((b) => {
        const count = counts[b.rating] ?? 0;
        const percent = total > 0 ? (count / maxCount) * 100 : 0;
        const checked = selectedRatings?.has(b.rating) ?? false;

        return (
          <Stack key={b.rating} direction="row" alignItems="center" spacing={2}>
            <StyledCheckbox
              size="large"
              checked={checked}
              onChange={() => onRatingClick?.(b.rating)}
            />

            <Typography
              variant="h6"
              sx={{ width: 28, textAlign: "center", fontWeight: 600 }}
            >
              {b.rating}
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

function areEqual(
  prev: Readonly<React.ComponentProps<typeof RatingsDistribution>>,
  next: Readonly<React.ComponentProps<typeof RatingsDistribution>>
) {
  const prevSummary = prev.summary;
  const nextSummary = next.summary;

  if (prevSummary === nextSummary) {
    // same reference, still need to check selectedRatings and handler
  } else {
    if (!prevSummary || !nextSummary) return false;

    if (prevSummary.ratings_count !== nextSummary.ratings_count) return false;
    const prevBreak = prevSummary.breakdown || [];
    const nextBreak = nextSummary.breakdown || [];
    if (prevBreak.length !== nextBreak.length) return false;
    for (let i = 0; i < prevBreak.length; i++) {
      if (
        prevBreak[i].rating !== nextBreak[i].rating ||
        prevBreak[i].count !== nextBreak[i].count
      )
        return false;
    }
  }

  const prevSel = prev.selectedRatings;
  const nextSel = next.selectedRatings;
  if (prevSel === nextSel) return prev.onRatingClick === next.onRatingClick;
  if (!prevSel || !nextSel) return false;
  if (prevSel.size !== nextSel.size) return false;
  for (const v of prevSel) if (!nextSel.has(v)) return false;

  return prev.onRatingClick === next.onRatingClick;
}

export default memo(RatingsDistribution, areEqual);
