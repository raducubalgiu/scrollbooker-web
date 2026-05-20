"use client";

import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import { Container, Stack } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Grid from "@mui/material/Grid2";
import BusinessStickyCard from "./components/BusinessStickyCard";

import dynamic from "next/dynamic";
import NearbyBusinesses from "./components/NearbyBusinesses";
import BusinessProfileHeader from "./components/BusinessProfileHeader";
import BusinessProfileTabs from "./tabs/BusinessProfileTabs";

const BusinessPhotosTab = dynamic(() => import("./tabs/BusinessPhotosTab"), {
  ssr: true,
});
const BusinessServicesTab = dynamic(
  () => import("./tabs/BusinessServicesTab"),
  {
    ssr: true,
  }
);
const BusinessPostsTab = dynamic(() => import("./tabs/BusinessPostsTab"), {
  ssr: true,
});
const BusinessReviewsTab = dynamic(() => import("./tabs/BusinessReviewsTab"), {
  ssr: true,
});
const BusinessAboutTab = dynamic(() => import("./tabs/BusinessAboutTab"), {
  ssr: true,
});

type BusinessProfileModuleProps = {
  profile: BusinessProfile | null;
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

const BusinessProfileModule = ({ profile }: BusinessProfileModuleProps) => {
  if (!profile) return null;

  const [isTabsVisible, setIsTabsVisible] = useState(false);

  const [activeTab, setActiveTab] = useState<string>(
    TAB_SECTIONS[0]?.id ?? "services"
  );

  const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    photos: null,
    services: null,
    social: null,
    reviews: null,
    about: null,
  });

  useEffect(() => {
    const handleScroll = (): void => {
      const servicesElement = sectionRefs.current["services"];
      if (servicesElement) {
        const rect = servicesElement.getBoundingClientRect();

        const shouldBeVisible = rect.top <= 80;

        if (isTabsVisible !== shouldBeVisible) {
          setIsTabsVisible(shouldBeVisible);
        }
      }

      const stickyTabsHeight = tabsContainerRef.current?.offsetHeight ?? 0;
      const activationOffset = stickyTabsHeight + 100;

      let currentActiveTab = TAB_SECTIONS[0]?.id ?? "services";

      for (const section of TAB_SECTIONS) {
        const element = sectionRefs.current[section.id];
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= activationOffset) {
          currentActiveTab = section.id;
        }
      }

      setActiveTab((prev) =>
        prev !== currentActiveTab ? currentActiveTab : prev
      );
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTabsVisible]);

  const scrollToSection = (sectionId: string): void => {
    const element = sectionRefs.current[sectionId];
    if (!element) return;

    const stickyTabsHeight = tabsContainerRef.current?.offsetHeight ?? 0;

    const top =
      window.scrollY +
      element.getBoundingClientRect().top -
      stickyTabsHeight -
      12;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const handleTabChange = (
    _event: React.SyntheticEvent,
    value: string
  ): void => {
    setActiveTab(value);
    scrollToSection(value);
  };

  const sectionRefCallbacks = useMemo(
    () => ({
      photos: (element: HTMLDivElement | null) => {
        sectionRefs.current.photos = element;
      },
      services: (element: HTMLDivElement | null) => {
        sectionRefs.current.services = element;
      },
      social: (element: HTMLDivElement | null) => {
        sectionRefs.current.social = element;
      },
      reviews: (element: HTMLDivElement | null) => {
        sectionRefs.current.reviews = element;
      },
      about: (element: HTMLDivElement | null) => {
        sectionRefs.current.about = element;
      },
    }),
    []
  );

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
        />

        <Grid container spacing={5}>
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
            {profile && <BusinessStickyCard business={profile} />}
          </Grid>
        </Grid>

        <NearbyBusinesses businesses={profile.nearby_businesses} />
      </Container>
    </>
  );
};

export default BusinessProfileModule;
