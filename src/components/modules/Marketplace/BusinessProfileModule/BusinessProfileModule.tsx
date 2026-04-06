"use client";

import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import {
  alpha,
  Box,
  Button,
  Rating,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Grid from "@mui/material/Grid2";
import BusinessStickyCard from "./BusinessStickyCard";
import SearchHeader from "../SearchModule/SearchHeader/SearchHeader";
import { useRouter } from "next/navigation";
import IosShareIcon from "@mui/icons-material/IosShare";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import dynamic from "next/dynamic";
import { SearchHeaderStateType } from "../SearchModule/SearchHeader/search-header-types";
import Link from "next/link";

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

type TabSection = {
  id: string;
  label: string;
};

const TAB_SECTIONS: TabSection[] = [
  { id: "photos", label: "Fotografii" },
  { id: "services", label: "Servicii" },
  { id: "social", label: "Postari" },
  { id: "reviews", label: "Recenzii" },
  { id: "about", label: "Despre" },
];

const BusinessProfileModule = ({ profile }: BusinessProfileModuleProps) => {
  if (!profile) return null;
  const theme = useTheme();
  const mainPagePadding = theme.spacing(2.5);
  const router = useRouter();

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
      // 1. Logica pentru Vizibilitatea Tab-urilor (Apar doar la Services)
      const servicesElement = sectionRefs.current["services"];
      if (servicesElement) {
        const rect = servicesElement.getBoundingClientRect();

        // Activăm tab-urile când marginea de sus a secțiunii Services
        // ajunge aproape de top (ex: 80px distanță)
        // Folosim un prag fix pentru a evita "tremuratul"
        const shouldBeVisible = rect.top <= 80;

        if (isTabsVisible !== shouldBeVisible) {
          setIsTabsVisible(shouldBeVisible);
        }
      }

      // 2. Logica pentru Tab-ul Activ (Care secțiune e în focus)
      const stickyTabsHeight = tabsContainerRef.current?.offsetHeight ?? 0;
      const activationOffset = stickyTabsHeight + 100; // Offset mai generos pentru precizie

      let currentActiveTab = TAB_SECTIONS[0]?.id ?? "services";

      for (const section of TAB_SECTIONS) {
        const element = sectionRefs.current[section.id];
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        // Dacă secțiunea a trecut de pragul de sus, o considerăm activă
        if (rect.top <= activationOffset) {
          currentActiveTab = section.id;
        }
      }

      setActiveTab((prev) =>
        prev !== currentActiveTab ? currentActiveTab : prev
      );
    };

    // Executăm o dată la mount pentru a seta starea inițială corectă
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTabsVisible]); // Adăugăm isTabsVisible în dependențe pentru a reflecta starea corect în clousur

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

  const handleSearch = useCallback((state: SearchHeaderStateType) => {
    const params = new URLSearchParams();

    if (state.selectedBusinessDomainId != null) {
      params.set("businessDomain", String(state.selectedBusinessDomainId));
    }

    if (state.selectedServiceDomainId != null) {
      params.set("serviceDomain", String(state.selectedServiceDomainId));
    }

    if (state.selectedServiceId != null) {
      params.set("service", String(state.selectedServiceId));
    }

    router.push(`/search?${params.toString()}`, { scroll: false });
  }, []);

  return (
    <Box sx={{ px: 5, py: 1, bgcolor: "background.paper" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2.5}
      >
        <Box
          component={Link}
          href="/"
          sx={{
            textDecoration: "none",
            display: "block",
            color: "inherit",
            cursor: "pointer",
            "&:hover .imageWrapper": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontWeight={800}
            fontSize={35}
            sx={{ fontStyle: "italic" }}
          >
            ScrollBooker
          </Typography>
        </Box>

        <SearchHeader
          selectedServiceDomainName=""
          mainPagePadding={mainPagePadding}
          headerState={{
            selectedBusinessDomainId: null,
            selectedServiceDomainId: null,
            selectedServiceId: null,
          }}
          displayFiltersSection={false}
          onSearch={handleSearch}
        />

        <Typography
          variant="h6"
          noWrap
          component="div"
          fontWeight={700}
          fontSize={30}
          sx={{ color: "transparent" }}
        >
          ScrollBooker
        </Typography>
      </Stack>

      <Box
        ref={tabsContainerRef}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar + 100,
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: isTabsVisible ? "divider" : "transparent",

          transition:
            "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s",

          transform: isTabsVisible ? "translateY(0)" : "translateY(-100%)",
          opacity: isTabsVisible ? 1 : 0,

          pointerEvents: isTabsVisible ? "all" : "none",
          boxShadow: isTabsVisible ? "0px 4px 20px rgba(0,0,0,0.05)" : "none",
          willChange: "transform, opacity",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 5,
            "& .MuiTabs-indicator": {
              height: 4,
              borderRadius: "4px",
              backgroundColor: "primary.main",
              transition: isTabsVisible
                ? "all 300ms cubic-bezier(0.4, 0, 0.2, 1)"
                : "none !important",
            },
          }}
        >
          {TAB_SECTIONS.map((section) => (
            <Tab
              key={section.id}
              value={section.id}
              label={section.label}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                fontSize: 18,
                py: 3,
                color: "text.primary",
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
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="h4"
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
          </Box>

          <Stack flexDirection="row" alignItems="center" gap={2}>
            <Button
              endIcon={
                profile.owner.is_follow && (
                  <CheckOutlinedIcon
                    color="primary"
                    sx={{ width: 27.5, height: 27.5 }}
                  />
                )
              }
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ px: 5, py: 2, fontSize: 18 }}
            >
              {profile.owner.is_follow ? "Urmaresti" : "Urmareste"}
            </Button>

            <Button
              startIcon={<IosShareIcon sx={{ width: 27.5, height: 27.5 }} />}
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ px: 5, py: 2, fontSize: 18 }}
            >
              Distribuie
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <BusinessPhotosTab
            id="photos"
            innerRef={sectionRefCallbacks.photos}
            mediaFiles={profile.media_files || []}
          />

          <Box>
            <Stack sx={{ py: 3 }} spacing={10}>
              <BusinessServicesTab
                id="services"
                innerRef={sectionRefCallbacks.services}
              />
              <BusinessPostsTab
                id="social"
                innerRef={sectionRefCallbacks.social}
                posts={profile.posts}
              />
              <BusinessReviewsTab
                id="reviews"
                innerRef={sectionRefCallbacks.reviews}
                reviews={profile.reviews}
              />
              <BusinessAboutTab
                id="about"
                innerRef={sectionRefCallbacks.about}
                profile={profile}
              />
            </Stack>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          {profile && <BusinessStickyCard business={profile} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessProfileModule;
