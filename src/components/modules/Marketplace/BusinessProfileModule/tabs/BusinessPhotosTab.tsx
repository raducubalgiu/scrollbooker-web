import React, { memo } from "react";
import BusinessProfileGallery from "../components/BusinessGallery";
import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import { BusinessMediaFile } from "@/ts/models/booking/business/BusinessMediaFile";
import IosShareIcon from "@mui/icons-material/IosShare";
import { BusinessOwnerProfile } from "@/ts/models/booking/business/BusinessProfile";
import { formatRating } from "@/utils/formatters";

type BusinessPhotosTabProps = {
  id: string;
  innerRef: (element: HTMLDivElement | null) => void;
  owner: BusinessOwnerProfile;
  mediaFiles?: BusinessMediaFile[];
  onFollow: () => void;
  onShare: () => void;
};

const BusinessPhotosTab = ({
  id,
  innerRef,
  owner,
  mediaFiles,
  onFollow,
  onShare,
}: BusinessPhotosTabProps) => {
  const { fullname, counters, is_follow } = owner;
  const { ratings_average, ratings_count } = counters;

  return (
    <Box id={id} ref={innerRef}>
      <Stack mb={2}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack spacing={0.5}>
            <Typography
              variant="h3"
              fontWeight={600}
              sx={{ textTransform: "uppercase" }}
            >
              {fullname}
            </Typography>
            <Stack flexDirection="row" alignItems="center" gap={1}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {formatRating(ratings_average)}
              </Typography>
              <Rating
                value={owner.counters.ratings_average || 0}
                precision={0.5}
                readOnly
                size="large"
              />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                ({ratings_count || 0})
              </Typography>
            </Stack>
          </Stack>

          <Stack flexDirection="row" alignItems="center" gap={2}>
            <Button
              onClick={onFollow}
              variant={is_follow ? "outlined" : "contained"}
              color={is_follow ? "secondary" : "primary"}
              size="large"
              disableElevation
            >
              {is_follow ? "Urmărești" : "Urmărește"}
            </Button>

            <Button
              onClick={onShare}
              startIcon={<IosShareIcon sx={{ width: 27.5, height: 27.5 }} />}
              variant="outlined"
              color="secondary"
              size="large"
            >
              Distribuie
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <BusinessProfileGallery mediaFiles={mediaFiles || []} />
    </Box>
  );
};

export default memo(BusinessPhotosTab);
