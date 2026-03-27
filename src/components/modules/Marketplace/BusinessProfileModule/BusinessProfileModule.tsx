"use client";

import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import { Box, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import SearchHeaderBar from "../SearchModule/SearchHeader/SearchHeaderBar";
import Grid from "@mui/material/Grid2";
import BusinessProfileGallery from "./BusinessGallery";
import BusinessStickyCard from "./BusinessStickyCard";
import CustomTabs from "@/components/core/CustomTabs/CustomTabs";

type BusinessProfileModuleProps = {
  profile: BusinessProfile | null;
};

const BusinessProfileModule = ({ profile }: BusinessProfileModuleProps) => {
  if (!profile) return null;

  return (
    <Box sx={{ px: 2.5, bgcolor: "background.paper" }}>
      <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
        <SearchHeaderBar
          isExpanded={false}
          toggle={() => {}}
          activeSection={null}
          onSearch={() => {}}
        />
      </Stack>

      <Stack mb={2}>
        <Typography
          variant="h3"
          fontWeight={600}
          sx={{ textTransform: "uppercase" }}
        >
          {profile?.owner.fullname}
        </Typography>

        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            5,0
          </Typography>
          <Rating
            value={profile?.owner.counters.ratings_average || 0}
            precision={0.5}
            readOnly
            sx={{ color: "primary.main" }}
          />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            ({profile?.owner.counters.ratings_count || 0})
          </Typography>
        </Stack>
      </Stack>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <BusinessProfileGallery mediaFiles={profile.media_files || []} />

          <Box
            sx={{
              position: { lg: "sticky" },
              top: 0,
            }}
          >
            <Box sx={{ bgcolor: "background.paper", zIndex: 1, py: 2.5 }}>
              <CustomTabs
                tabs={[
                  { label: "Despre", key: 0 },
                  { label: "Servicii", key: 1 },
                  { label: "Recenzii", key: 2 },
                  { label: "Galerie", key: 3 },
                ]}
                currentTab={0}
                setValue={() => {}}
              />
            </Box>
          </Box>

          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {profile?.description}
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
          <Typography variant="h4" mt={3} mb={1} fontWeight={600}>
            Despre
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          {profile && (
            <BusinessStickyCard
              // name={profile?.owner.fullname}
              // avatarUrl={profile?.owner.avatar}
              // category="Frizerie"
              // city="Bucuresti"
              // rating={profile?.owner.counters.ratings_average}
              // reviewsCount={profile?.owner.counters.ratings_count}
              // followersCount={profile?.owner.counters.followers_count}
              // isOpenNow={true}
              // openUntil="21:00"
              // responseTime="Răspunde în 1 oră"
              // bookingType="instant"
              // nextAvailabilityLabel="Azi, de la 16:30"
              // onBook={() => console.log("book")}
              // onFollow={() => console.log("follow")}
              // onMessage={() => console.log("message")}
              // onShare={() => console.log("share")}
              // onSave={() => console.log("save")}
              business={profile}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessProfileModule;
