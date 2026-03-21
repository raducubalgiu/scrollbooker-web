import { Box, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RatingsDistribution from "@/components/cutomized/RatingsDistribution/RatingsDistribution";
import CustomTabs, {
  CustomTabType,
} from "@/components/core/CustomTabs/CustomTabs";

type SocialReviewsTabProps = {
  userId: number | undefined;
  rootRef?: React.RefObject<HTMLDivElement | null>;
  disableInitialIgnore?: boolean;
};

const SocialReviewsTab = ({ userId }: SocialReviewsTabProps) => {
  const tabs: CustomTabType[] = [
    { label: "Scrise", key: 0 },
    { label: "Video", key: 1 },
  ];

  return (
    <Box>
      <Stack alignItems="center" justifyContent="center" sx={{ my: 1.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="h4" fontWeight={600}>
            4,6
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" ml={1.5}>
            (100)
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

      <RatingsDistribution />

      <Stack alignItems="center" justifyContent="center" sx={{ my: 1.5 }}>
        <CustomTabs currentTab={0} tabs={tabs} setValue={() => {}} />
      </Stack>
    </Box>
  );
};

export default memo(SocialReviewsTab);
