"use client";

import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import {
  alpha,
  Box,
  Button,
  Container,
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
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Image from "next/image";

import dynamic from "next/dynamic";
import { SearchHeaderStateType } from "../SearchModule/SearchHeader/search-header-types";
import Link from "next/link";

type NearbyBusinessItem = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  ratingAverage: number;
  ratingCount: number;
  distanceText: string; // ex: "la 1.2 km distanță" sau "București (0.5 km)"
  categoryName: string;
};

type NearbyBusinessesProps = {
  businesses: NearbyBusinessItem[];
};

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

  const DUMMY_NEARBY_BUSINESSES: NearbyBusinessItem[] = [
    {
      id: "near-1",
      slug: "glow-up-salon",
      name: "Glow Up Beauty Lounge",
      imageUrl: profile.media_files[0]?.thumbnail_url ?? "",
      ratingAverage: 4.9,
      ratingCount: 142,
      distanceText: "la 0.4 km distanță",
      categoryName: "Salon de înfrumusețare",
    },
    {
      id: "near-2",
      slug: "zen-dental-clinic",
      name: "ZenDental Clinic",
      imageUrl: profile.media_files[0]?.thumbnail_url ?? "",
      ratingAverage: 4.8,
      ratingCount: 89,
      distanceText: "la 1.1 km distanță",
      categoryName: "Clinicst stomatologică",
    },
    {
      id: "near-3",
      slug: "iron-gym-fitness",
      name: "Iron Gym & Fitness",
      imageUrl: profile.media_files[0]?.thumbnail_url ?? "",
      ratingAverage: 4.7,
      ratingCount: 210,
      distanceText: "la 1.8 km distanță",
      categoryName: "Sală de fitness",
    },
    {
      id: "near-4",
      slug: "urban-barber-shop",
      name: "The Urban Barber Shop",
      imageUrl: profile.media_files[0]?.thumbnail_url ?? "",
      ratingAverage: 5.0,
      ratingCount: 64,
      distanceText: "la 2.3 km distanță",
      categoryName: "Frizerie / Barber Shop",
    },
  ];

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mt={1}
        mb={7.5}
        mx={7.5}
      >
        <Box
          component={Link}
          href="/"
          sx={{
            textDecoration: "none",
            display: "block",
            color: "inherit",
            cursor: "pointer",
            "&:hover .imageWrapper": { transform: "scale(1.05)" },
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontWeight={600}
            fontSize={32.5}
          >
            ScrollBooker
          </Typography>
        </Box>

        <SearchHeader
          businessDomains={[]}
          areFiltersActive={false}
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

      <Container
        maxWidth="xl"
        sx={{ px: 5, py: 1, bgcolor: "background.paper" }}
      >
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
          <Container maxWidth="xl">
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
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
                    "&.Mui-selected": { fontWeight: 700, boxShadow: "none" },
                    "&:hover": { opacity: 0.92 },
                    "&.Mui-focusVisible": {
                      boxShadow: (theme) =>
                        `0 0 0 4px ${alpha(theme.palette.primary.main, 0.12)}`,
                    },
                  }}
                />
              ))}
            </Tabs>
          </Container>
        </Box>

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
                {profile?.owner?.fullname}
              </Typography>
              <Stack flexDirection="row" alignItems="center" gap={1}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  5,0
                </Typography>
                <Rating
                  value={profile?.owner?.counters?.ratings_average || 0}
                  precision={0.5}
                  readOnly
                  size="large"
                />
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  ({profile?.owner?.counters?.ratings_count || 0})
                </Typography>
              </Stack>
            </Stack>

            <Stack flexDirection="row" alignItems="center" gap={2}>
              <Button
                variant={profile?.owner?.is_follow ? "outlined" : "contained"}
                color={profile?.owner?.is_follow ? "secondary" : "primary"}
                size="large"
                disableElevation
              >
                {profile?.owner?.is_follow ? "Urmărești" : "Urmărește"}
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

        {/* Galerie Full-Width calculată dinamic pe înălțimea rămasă a ecranului */}
        <BusinessPhotosTab
          id="photos"
          innerRef={sectionRefCallbacks.photos}
          mediaFiles={profile?.media_files || []}
        />

        {/* Restul conținutului cu Grid asimetric (7/5) pentru text și cardul sticky */}
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, lg: 7.5 }}>
            <Box>
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
            </Box>
          </Grid>
          <Grid size={{ xs: 12, lg: 4.5 }}>
            {profile && <BusinessStickyCard business={profile} />}
          </Grid>
        </Grid>

        <Box
          sx={{ py: 4, borderTop: "1px solid", borderColor: "divider", mt: 5 }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
            Alte business-uri în apropiere
          </Typography>

          {/* Container flexibil: listă verticală pe ecrane mici, grid aerisit pe desktop */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
                lg: "1fr 1fr 1fr 1fr",
              },
              gap: 3,
            }}
          >
            {DUMMY_NEARBY_BUSINESSES.map((item) => (
              <Box
                key={item.id}
                component={Link}
                href={`/business/${item.slug}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  "&:hover .business-image": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                {/* Zona imaginii în format pur landscape */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    // Forțează un format dreptunghiular perfect (ex: 4:3 sau 16:10 ca pe Airbnb)
                    aspectRatio: "1.4/1",
                    borderRadius: 4,
                    overflow: "hidden",
                    bgcolor: "action.hover",
                  }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
                    className="business-image"
                    style={{
                      objectFit: "cover",
                      transition:
                        "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
                    }}
                  />
                </Box>

                {/* Secțiunea de detalii (text) */}
                <Box sx={{ px: 0.5 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    {/* Numele afacerii */}
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      noWrap
                      sx={{ color: "text.primary", fontSize: 17 }}
                    >
                      {item.name}
                    </Typography>

                    {/* Rating în stil Airbnb (Stea + text pe un singur rând) */}
                    <Stack direction="row" alignItems="center" spacing={0.3}>
                      <StarRoundedIcon
                        sx={{ fontSize: 18, color: "text.primary" }}
                      />
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="text.primary"
                      >
                        {item.ratingAverage.toFixed(1)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ({item.ratingCount})
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Categorie / Detalii secundare */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, fontWeight: 400 }}
                  >
                    {item.categoryName}
                  </Typography>

                  {/* Distanța fizică */}
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontWeight={500}
                    sx={{ mt: 0.25 }}
                  >
                    {item.distanceText}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default BusinessProfileModule;
