import React, { memo } from "react";
import BusinessProfileGallery from "../BusinessGallery";
import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import { BusinessMediaFile } from "@/ts/models/booking/business/BusinessMediaFile";
import IosShareIcon from "@mui/icons-material/IosShare";
import { BusinessOwnerProfile } from "@/ts/models/booking/business/BusinessProfile";

type BusinessPhotosTabProps = {
  id: string;
  innerRef: (element: HTMLDivElement | null) => void;
  owner: BusinessOwnerProfile;
  mediaFiles?: BusinessMediaFile[];
};

const BusinessPhotosTab = ({
  id,
  innerRef,
  owner,
  mediaFiles,
}: BusinessPhotosTabProps) => {
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
              {owner.fullname}
            </Typography>
            <Stack flexDirection="row" alignItems="center" gap={1}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                5,0
              </Typography>
              <Rating
                value={owner.counters.ratings_average || 0}
                precision={0.5}
                readOnly
                size="large"
              />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                ({owner.counters.ratings_count || 0})
              </Typography>
            </Stack>
          </Stack>

          <Stack flexDirection="row" alignItems="center" gap={2}>
            <Button
              variant={owner.is_follow ? "outlined" : "contained"}
              color={owner.is_follow ? "secondary" : "primary"}
              size="large"
              disableElevation
            >
              {owner.is_follow ? "Urmărești" : "Urmărește"}
            </Button>

            <Button
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
