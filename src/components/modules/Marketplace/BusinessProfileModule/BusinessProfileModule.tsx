"use client";

import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import {
  alpha,
  Box,
  Rating,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import SearchHeaderBar from "../SearchModule/SearchHeader/SearchHeaderBar";
import Grid from "@mui/material/Grid2";
import BusinessStickyCard from "./BusinessStickyCard";
import BusinessServicesTab from "./tabs/BusinessServicesTab";
import BusinessPostsTab from "./tabs/BusinessPostsTab";
import BusinessReviewsTab from "./tabs/BusinessReviewsTab";
import BusinessAboutTab from "./tabs/BusinessAboutTab";
import BusinessPhotosTab from "./tabs/BusinessPhotosTab";

type BusinessProfileModuleProps = {
  profile: BusinessProfile | null;
};

type TabSection = {
  id: string;
  label: string;
};

const TAB_SECTIONS: TabSection[] = [
  { id: "photos", label: "Photos" },
  { id: "services", label: "Services" },
  { id: "social", label: "Social" },
  { id: "reviews", label: "Reviews" },
  { id: "about", label: "About" },
];

const BusinessProfileModule = ({ profile }: BusinessProfileModuleProps) => {
  if (!profile) return null;

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
      const stickyTabsHeight = tabsContainerRef.current?.offsetHeight ?? 0;
      const activationOffset = stickyTabsHeight + 16;

      let currentActiveTab = TAB_SECTIONS[0]?.id ?? "services";

      for (const section of TAB_SECTIONS) {
        const element = sectionRefs.current[section.id];
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top - activationOffset <= 0) {
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
  }, [sectionRefs]);

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
    <Box sx={{ px: 2.5, bgcolor: "background.paper" }}>
      <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
        <SearchHeaderBar
          isExpanded={false}
          toggle={() => {}}
          activeSection={null}
          onSearch={() => {}}
        />
      </Stack>

      <Box
        ref={tabsContainerRef}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Business profile sections"
        >
          {TAB_SECTIONS.map((section) => (
            <Tab
              key={section.id}
              value={section.id}
              label={section.label}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                fontSize: 17,
                py: 2.5,
                color: "text.secondary",
                "&.Mui-selected": {
                  fontWeight: 700,
                  boxShadow: "none",
                },
                "&:hover": { opacity: 0.92 },
                "&.Mui-focusVisible": {
                  boxShadow: (theme) =>
                    `0 0 0 4px ${alpha(theme.palette.primary.main, 0.12)}`,
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

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
          <BusinessPhotosTab
            id="photos"
            innerRef={sectionRefCallbacks.photos}
            mediaFiles={profile.media_files || []}
          />

          <Box>
            <Box sx={{ py: 3 }}>
              <BusinessServicesTab
                id="services"
                innerRef={sectionRefCallbacks.services}
              />
              <BusinessPostsTab
                id="social"
                innerRef={sectionRefCallbacks.social}
              />
              <BusinessReviewsTab
                id="reviews"
                innerRef={sectionRefCallbacks.reviews}
              />
              <BusinessAboutTab
                id="about"
                innerRef={sectionRefCallbacks.about}
              />
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          {profile && <BusinessStickyCard business={profile} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessProfileModule;
