import React, { memo } from "react";
import BusinessProfileGallery from "../components/BusinessGallery";
import {
  alpha,
  Box,
  Button,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import IosShareIcon from "@mui/icons-material/IosShare";
import { BusinessMediaFile } from "@/ts/models/booking/business/BusinessMediaFile";
import { BusinessOwnerProfile } from "@/ts/models/booking/business/BusinessProfile";
import { formatRating } from "@/utils/formatters";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";
import { BookingSourceEnum } from "@/ts/enums/BookingSourceEnum";

type BusinessPhotosTabProps = {
  id: string;
  innerRef: (element: HTMLDivElement | null) => void;
  owner: BusinessOwnerProfile;
  businessId: number;
  mediaFiles?: BusinessMediaFile[];
  onFollow: () => void;
  onShare: () => void;
};

const overlayIconButtonSx = {
  width: 38,
  height: 38,
  padding: 0,
  bgcolor: (theme: import("@mui/material").Theme) =>
    alpha(theme.palette.background.paper, 0.7),
  backdropFilter: "blur(6px)",
  "&:hover": {
    bgcolor: (theme: import("@mui/material").Theme) =>
      alpha(theme.palette.background.paper, 0.9),
  },
};

const BusinessPhotosTab = ({
  id,
  innerRef,
  owner,
  businessId,
  mediaFiles,
  onFollow,
  onShare,
}: BusinessPhotosTabProps) => {
  const { fullname, counters, is_follow } = owner;
  const { ratings_average, ratings_count } = counters;
  const { navigateTo, goBack } = useAppNavigation();

  const handleNavigateToBooking = () => {
    navigateTo(
      AppRoutes.booking(
        businessId,
        owner.id,
        owner.id,
        BookingSourceEnum.SEARCH_BUSINESS_PROFILE,
        null
      )
    );
  };

  return (
    <Box
      id={id}
      ref={innerRef}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ order: { xs: 2, md: 1 }, pt: { xs: 2, md: 0 } }}>
        <Stack mb={3}>
          <Stack
            flexDirection={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            gap={2.5}
          >
            <Stack spacing={0.5} sx={{ width: "100%", minWidth: 0 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "3rem",
                  },
                  lineHeight: 1.2,
                  wordBreak: "break-word",
                }}
              >
                {fullname}
              </Typography>

              <Stack
                flexDirection="row"
                alignItems="center"
                gap={1}
                flexWrap="wrap"
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1.25rem", md: "1.75rem" },
                  }}
                >
                  {formatRating(ratings_average)}
                </Typography>
                <Rating
                  value={ratings_average || 0}
                  precision={0.5}
                  readOnly
                  size={"large"}
                  sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1.1rem", md: "1.75rem" },
                    color: "text.secondary",
                  }}
                >
                  ({ratings_count || 0})
                </Typography>
              </Stack>
            </Stack>

            <Stack
              flexDirection="row"
              alignItems="center"
              gap={1.5}
              sx={{
                width: { xs: "100%", md: "auto" },
                justifyContent: { xs: "stretch", md: "flex-end" },
              }}
            >
              <Button
                onClick={handleNavigateToBooking}
                variant="contained"
                disableElevation
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  flexGrow: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Rezervă
              </Button>

              <Button
                onClick={onFollow}
                variant={is_follow ? "outlined" : "contained"}
                color="secondary"
                disableElevation
                sx={{
                  flexGrow: { xs: 1, md: 0 },
                  textTransform: "none",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {is_follow ? "Urmărești" : "Urmărește"}
              </Button>

              <Button
                onClick={onShare}
                startIcon={
                  <IosShareIcon
                    sx={{
                      width: { xs: 20, md: 24 },
                      height: { xs: 20, md: 24 },
                    }}
                  />
                }
                variant="outlined"
                color="secondary"
                sx={{
                  display: { xs: "none", md: "inline-flex" },
                  flexGrow: { xs: 1, md: 0 },
                  textTransform: "none",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Distribuie
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ order: { xs: 1, md: 2 }, position: "relative" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            display: { xs: "flex", md: "none" },
            position: "absolute",
            top: 12,
            left: 12,
            right: 12,
            zIndex: 2,
          }}
        >
          <IconButton onClick={() => goBack()} sx={overlayIconButtonSx}>
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton onClick={onShare} sx={overlayIconButtonSx}>
            <IosShareIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>

        <BusinessProfileGallery mediaFiles={mediaFiles || []} />
      </Box>
    </Box>
  );
};

export default memo(BusinessPhotosTab);
