"use client";

import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import { Container, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import BusinessStickyCard from "./components/BusinessStickyCard";
import NearbyBusinesses from "./components/NearbyBusinesses";
import BusinessProfileHeader from "./components/BusinessProfileHeader";
import BusinessProfileTabs from "./tabs/BusinessProfileTabs";
import { useMutate } from "@/hooks/useHttp";
import BusinessPhotosTab from "./tabs/BusinessPhotosTab";
import BusinessServicesTab from "./tabs/BusinessServicesTab";
import BusinessPostsTab from "./tabs/BusinessPostsTab";
import BusinessReviewsTab from "./tabs/BusinessReviewsTab";
import BusinessAboutTab from "./tabs/BusinessAboutTab";
import { useBusinessSocialActions } from "./useBusinessProfileSocialActions";
import { useBusinessProfileScroll } from "./useBusinessProfileScroll";

type BusinessProfileModuleProps = {
  initialProfile: BusinessProfile;
};

export type BusinessProfileTabSection = {
  id: string;
  label: string;
};

const TAB_SECTIONS: BusinessProfileTabSection[] = [
  { id: "photos", label: "Fotografii" },
  { id: "services", label: "Servicii" },
  { id: "social", label: "Postari" },
  { id: "reviews", label: "Recenzii" },
  { id: "about", label: "Despre" },
];

const BusinessProfileModule = ({
  initialProfile,
}: BusinessProfileModuleProps) => {
  const { profile, handleFollow, handleShare } = useBusinessSocialActions(
    initialProfile,
    useMutate
  );

  const {
    tabsContainerRef,
    isTabsVisible,
    activeTab,
    handleTabChange,
    sectionRefCallbacks,
  } = useBusinessProfileScroll(TAB_SECTIONS);

  return (
    <>
      <BusinessProfileHeader />

      <Container maxWidth="xl" sx={{ px: 5, py: 1 }}>
        <BusinessProfileTabs
          tabsContainerRef={tabsContainerRef}
          isTabsVisible={isTabsVisible}
          tabSections={TAB_SECTIONS}
          activeTab={activeTab}
          onChangeTab={handleTabChange}
        />

        <BusinessPhotosTab
          id="photos"
          innerRef={sectionRefCallbacks.photos}
          owner={profile.owner}
          mediaFiles={profile?.media_files || []}
          onFollow={handleFollow}
          onShare={handleShare}
        />

        <Grid container spacing={7.5}>
          <Grid size={{ xs: 12, lg: 7.5 }}>
            <Stack sx={{ py: 3 }} spacing={10}>
              <BusinessServicesTab
                id="services"
                innerRef={sectionRefCallbacks.services}
              />
              <BusinessPostsTab
                id="social"
                innerRef={sectionRefCallbacks.social}
                posts={profile?.posts}
              />
              <BusinessReviewsTab
                id="reviews"
                innerRef={sectionRefCallbacks.reviews}
                owner={profile.owner}
                reviews={profile?.reviews}
              />
              <BusinessAboutTab
                id="about"
                innerRef={sectionRefCallbacks.about}
                profile={profile}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, lg: 4.5 }}>
            <BusinessStickyCard business={profile} />
          </Grid>
        </Grid>

        <NearbyBusinesses businesses={profile.nearby_businesses} />
      </Container>
    </>
  );
};

export default BusinessProfileModule;
