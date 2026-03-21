import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RatingsDistribution from "@/components/cutomized/RatingsDistribution/RatingsDistribution";
import CustomTabs, {
  CustomTabType,
} from "@/components/core/CustomTabs/CustomTabs";
import { useCustomQuery } from "@/hooks/useHttp";
import { ReviewsSummaryResponse } from "@/ts/models/booking/reviews/ReviewsSummaryType";

type SocialReviewsTabProps = {
  userId: number | undefined;
  rootRef?: React.RefObject<HTMLDivElement | null>;
  disableInitialIgnore?: boolean;
};

const SocialReviewsTab = ({ userId }: SocialReviewsTabProps) => {
  const { data, isLoading } = useCustomQuery<ReviewsSummaryResponse>({
    url: `/api/social/reviews/summary?userId=${userId}`,
    key: ["reviewsSummary", userId],
  });

  const tabs: CustomTabType[] = [
    { label: "Scrise", key: 0 },
    { label: "Video", key: 1 },
  ];

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        <>
          <Stack alignItems="center" justifyContent="center" sx={{ my: 1.5 }}>
            <Stack flexDirection="row" alignItems="center">
              <Typography variant="h4" fontWeight={600}>
                {data?.ratings_average}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" ml={1.5}>
                ({data?.ratings_count})
              </Typography>
            </Stack>
            <Stack flexDirection="row" alignItems="center" mt={1}>
              <StarIcon color="primary" sx={{ fontSize: 30 }} />
              <StarIcon color="primary" sx={{ fontSize: 30, ml: 1 }} />
              <StarIcon color="primary" sx={{ fontSize: 30, ml: 1 }} />
              <StarIcon color="primary" sx={{ fontSize: 30, ml: 1 }} />
              <StarBorderIcon color="primary" sx={{ fontSize: 30, ml: 1 }} />
            </Stack>
          </Stack>

          <RatingsDistribution summary={data} />

          <Stack alignItems="center" justifyContent="center" sx={{ my: 1.5 }}>
            <CustomTabs currentTab={0} tabs={tabs} setValue={() => {}} />
          </Stack>
        </>
      )}
    </>
  );
};

export default memo(SocialReviewsTab);
