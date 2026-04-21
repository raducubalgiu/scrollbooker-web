"use client";

import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import { useCustomQuery } from "@/hooks/useHttp";
import { BusinessProductsResponse } from "@/ts/models/booking/product/Product";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  Box,
  CircularProgress,
  IconButton,
  Theme,
  Typography,
} from "@mui/material";
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ProfileProductsTabProps = {
  businessId: number | null;
  userId: number;
};

const SCROLL_OFFSET = 80;
const SIDEBAR_WIDTH = 650;

const ProfileProductsTab = ({
  businessId,
  userId,
}: ProfileProductsTabProps) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabItemRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const isClickScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    ready: false,
  });

  const { data, isLoading } = useCustomQuery<BusinessProductsResponse[]>({
    key: ["business-products", !!businessId, userId],
    url: businessId ? `/api/businesses/${businessId}/products` : "",
    options: { enabled: !!businessId },
  });

  const services = useMemo(() => data ?? [], [data]);

  const updateIndicator = useCallback((index: number) => {
    const container = tabsContainerRef.current;
    const activeTab = tabItemRefs.current[index];

    if (!container || !activeTab) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeTab.getBoundingClientRect();

    setIndicatorStyle({
      width: activeRect.width,
      height: activeRect.height,
      x: activeRect.left - containerRect.left + container.scrollLeft,
      y: activeRect.top - containerRect.top,
      ready: true,
    });

    activeTab.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, []);

  useEffect(() => {
    if (services.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: `-${SCROLL_OFFSET + 20}px 0px -70% 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (isClickScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setCurrentTab(index);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [services]);

  const scrollToSection = (index: number) => {
    const target = sectionRefs.current[index];
    if (!target) return;

    isClickScrolling.current = true;
    setCurrentTab(index);

    const y =
      target.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;

    window.scrollTo({ top: y, behavior: "smooth" });

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);
  };

  useLayoutEffect(() => {
    updateIndicator(currentTab);
  }, [currentTab, updateIndicator, services]);

  const checkTabsOverflow = useCallback(() => {
    const el = tabsContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    }
  }, []);

  useEffect(() => {
    checkTabsOverflow();
    window.addEventListener("resize", checkTabsOverflow);
    return () => window.removeEventListener("resize", checkTabsOverflow);
  }, [services, checkTabsOverflow]);

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" p={5}>
        <CircularProgress />
      </Box>
    );
  if (!services.length)
    return (
      <Box p={3}>
        <Typography>Nu există produse.</Typography>
      </Box>
    );

  return (
    <Box pb={20} px={2.5}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: `minmax(0, 1fr) ${SIDEBAR_WIDTH}px`,
          },
          gap: { xs: 3, md: 6, lg: 8 },
          alignItems: "start",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              bgcolor: "background.paper",
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              {canScrollLeft && (
                <IconButton
                  onClick={() =>
                    tabsContainerRef.current?.scrollBy({
                      left: -220,
                      behavior: "smooth",
                    })
                  }
                  sx={{
                    position: "absolute",
                    left: -10,
                    zIndex: 3,
                    bgcolor: "background.paper",
                    boxShadow: 1,
                  }}
                >
                  <ChevronLeftRoundedIcon />
                </IconButton>
              )}

              <Box
                ref={tabsContainerRef}
                onScroll={checkTabsOverflow}
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  overflowY: "hidden",
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": { display: "none" },
                  position: "relative",
                  alignItems: "center",
                  gap: 1,
                  py: 1.5,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: indicatorStyle.y,
                    left: 0,
                    height: indicatorStyle.height,
                    width: indicatorStyle.width,
                    bgcolor: "primary.main",
                    borderRadius: 999,
                    transform: `translateX(${indicatorStyle.x}px)`,
                    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                    opacity: indicatorStyle.ready ? 1 : 0,
                    zIndex: 0,
                  }}
                />

                {services.map((group, index) => {
                  const isActive = currentTab === index;
                  return (
                    <Box
                      key={group.service.id}
                      component="button"
                      ref={(node: HTMLButtonElement | null) => {
                        tabItemRefs.current[index] = node;
                      }}
                      type="button"
                      onClick={() => scrollToSection(index)}
                      sx={(theme: Theme) => ({
                        position: "relative",
                        zIndex: 1,
                        appearance: "none",
                        border: 0,
                        outline: 0,
                        background: "transparent",
                        px: 3.5,
                        py: 2,
                        borderRadius: 999,
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                        flexShrink: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        fontWeight: 600,
                        lineHeight: 1.2,
                        color: isActive ? "#fff" : theme.palette.text.secondary,
                        transition: "color 180ms ease",
                      })}
                    >
                      {group.service.short_name}
                    </Box>
                  );
                })}
              </Box>

              {canScrollRight && (
                <IconButton
                  onClick={() =>
                    tabsContainerRef.current?.scrollBy({
                      left: 220,
                      behavior: "smooth",
                    })
                  }
                  sx={{
                    position: "absolute",
                    right: -10,
                    zIndex: 3,
                    bgcolor: "background.paper",
                    boxShadow: 1,
                  }}
                >
                  <ChevronRightRoundedIcon />
                </IconButton>
              )}
            </Box>
          </Box>

          <Box mt={4}>
            {services.map((group, index) => (
              <Box
                key={group.service.id}
                data-index={index}
                ref={(el: HTMLDivElement | null) => {
                  sectionRefs.current[index] = el;
                }}
                sx={{ mb: 8 }}
              >
                <Typography variant="h5" fontWeight={700} mb={3}>
                  {group.service.short_name}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {group.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSelected={false}
                      showIcon={false}
                      onOpenDetail={() => {}}
                      onNavigateToBooking={() => {}}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" } }}>Sidebar</Box>
      </Box>
    </Box>
  );
};

export default memo(ProfileProductsTab);
