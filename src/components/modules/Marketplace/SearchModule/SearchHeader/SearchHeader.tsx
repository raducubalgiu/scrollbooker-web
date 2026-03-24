import { Portal, Stack, Box } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import BusinessDomainsTabs from "../BusinessDomainsTabs";
import { SearchHeaderSectionType } from "@/components/modules/Marketplace/SearchModule/SearchHeaderSectionEnum";
import SearchPopperSections from "./SearchPopperSections";
import SearchHeaderBar from "./SearchHeaderBar";
import { useCustomQuery } from "@/hooks/useHttp";
import {
  BusinessDomainsResponse,
  BusinessDomainType,
} from "@/ts/models/nomenclatures/businessDomain/BusinessDomainType";

type SearchHeaderProps = {
  isMapVisible: boolean;
  onOpenFilters: () => void;
  onToggleMap: () => void;
  onHeightChange?: (height: number) => void;
  mainPagePadding?: number | string;
  selectedBusinessDomain: BusinessDomainType | null;
  onSetSelectedBusinessDomain: (domain: BusinessDomainType) => void;
};

const SearchHeader = ({
  isMapVisible,
  onOpenFilters,
  onToggleMap,
  onHeightChange,
  mainPagePadding = 0,
  selectedBusinessDomain,
  onSetSelectedBusinessDomain,
}: SearchHeaderProps) => {
  const theme = useTheme();

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const pillRef = React.useRef<HTMLDivElement | null>(null);
  const popperRef = React.useRef<HTMLDivElement | null>(null);

  const [activeSection, setActiveSection] =
    React.useState<SearchHeaderSectionType | null>(null);

  const isExpanded = activeSection !== null;
  const isExpandedRef = React.useRef(isExpanded);
  isExpandedRef.current = isExpanded;

  const closeSection = React.useCallback(() => setActiveSection(null), []);

  const toggle = React.useCallback((section: SearchHeaderSectionType) => {
    setActiveSection((prev) => (prev === section ? null : section));
  }, []);

  const STALE_TIME = 24 * 60 * 60 * 1000;
  const { data: rawBusinessDomains } = useCustomQuery<
    BusinessDomainsResponse | unknown
  >({
    key: ["businessDomains"],
    url: "/api/nomenclatures/business-domains",
    options: {
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
    },
  });

  const businessDomains = React.useMemo<BusinessDomainsResponse>(() => {
    const d = rawBusinessDomains as unknown;
    if (!d) return [];
    if (Array.isArray(d)) return d as BusinessDomainsResponse;

    if (typeof d === "object" && d !== null) {
      const rec = d as Record<string, unknown>;
      if (Array.isArray(rec.results))
        return rec.results as BusinessDomainsResponse;
      if (Array.isArray(rec.data)) return rec.data as BusinessDomainsResponse;
    }

    console.warn("SearchHeader: unexpected businessDomains shape", d);
    return [];
  }, [rawBusinessDomains]);

  React.useEffect(() => {
    const element = containerRef.current;
    if (!element || !onHeightChange) return;

    const notifyHeight = () =>
      onHeightChange(element.getBoundingClientRect().height);

    notifyHeight();

    const ro = new ResizeObserver(notifyHeight);
    ro.observe(element);
    return () => ro.disconnect();
  }, [onHeightChange]);

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!isExpandedRef.current) return;

      const targetNode = e.target as Node;
      if (popperRef.current?.contains(targetNode)) return;
      if (pillRef.current?.contains(targetNode)) return;

      setActiveSection(null);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  React.useEffect(() => {
    if (!isExpanded) return;

    const doc = document.documentElement;
    const body = document.body;

    const prev = {
      htmlOverflow: doc.style.overflow,
      htmlPaddingRight: doc.style.paddingRight,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
    } as const;

    const calcScrollbarWidth = () =>
      window.innerWidth - document.documentElement.clientWidth;
    const applyScrollbarCompensation = () => {
      const sw = calcScrollbarWidth();
      if (sw > 0) doc.style.paddingRight = `${sw}px`;
      else doc.style.paddingRight = "";
    };

    const isiOS = /iP(ad|hone|od)/.test(navigator.userAgent || "");
    let savedY: number | null = null;

    if (isiOS) {
      savedY = window.scrollY || window.pageYOffset;
      body.style.position = "fixed";
      body.style.top = `-${savedY}px`;
      body.style.left = "0";
      body.style.right = "0";
    } else {
      doc.style.overflow = "hidden";
      applyScrollbarCompensation();
    }

    const onResize = () => {
      applyScrollbarCompensation();
      window.requestAnimationFrame(() =>
        window.dispatchEvent(new Event("resize"))
      );
    };
    window.addEventListener("resize", onResize);

    const onTouchMove = (e: TouchEvent) => {
      try {
        if (
          popperRef.current?.contains(e.target as Node) ||
          pillRef.current?.contains(e.target as Node)
        )
          return;
      } catch (err) {
        // defensive
      }
      e.preventDefault();
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);

      doc.style.overflow = prev.htmlOverflow;
      doc.style.paddingRight = prev.htmlPaddingRight;

      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;

      if (isiOS && savedY !== null) {
        window.scrollTo(0, savedY);
      }
    };
  }, [isExpanded]);

  const backDrop = React.useMemo(
    () => (
      <Portal>
        {isExpanded && (
          <Box
            onClick={closeSection}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: theme.zIndex.drawer + 1,
              bgcolor: "rgba(0,0,0,0.28)",
            }}
          />
        )}
      </Portal>
    ),
    [isExpanded, closeSection, theme.zIndex]
  );

  const containerSx = React.useMemo(() => {
    const bg =
      theme.palette.mode === "dark" ? "background.default" : "background.paper";

    return {
      position: "sticky",
      top: 0,
      mt: `calc(-1 * ${mainPagePadding})`,
      zIndex: theme.zIndex.drawer + 2,
      backgroundColor: bg,
      pt: `calc(${mainPagePadding} + ${theme.spacing(1)})`,
      pb: 2.5,
      ...(isExpanded
        ? {
            position: "sticky",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.28)",
              pointerEvents: "none",
              zIndex: theme.zIndex.drawer + 1,
            },
          }
        : {}),
    } as const;
  }, [isExpanded, mainPagePadding, theme.palette.mode, theme.zIndex]);

  const pillSx = React.useMemo(
    () => ({ position: "relative", zIndex: theme.zIndex.drawer + 3 }),
    [theme.zIndex]
  );

  const onSearchClick = React.useCallback(() => {
    // placeholder for search action; stable ref prevents re-renders downstream
  }, []);

  return (
    <>
      {backDrop}

      <Box ref={containerRef} sx={containerSx}>
        <Stack direction="row" justifyContent="center" alignItems="flex-start">
          <Box ref={pillRef} sx={pillSx}>
            <SearchHeaderBar
              isExpanded={isExpanded}
              toggle={toggle}
              activeSection={activeSection}
              onSearch={onSearchClick}
              popperId="search-popper"
              close={closeSection}
            />

            <SearchPopperSections
              isExpanded={isExpanded}
              pillRef={pillRef}
              popperRef={popperRef}
              activeSection={activeSection}
              popperId="search-popper"
              businessDomains={businessDomains}
            />
          </Box>
        </Stack>

        <BusinessDomainsTabs
          isExpanded={isExpanded}
          isMapVisible={isMapVisible}
          onOpenFilters={onOpenFilters}
          onToggleMap={onToggleMap}
          businessDomains={businessDomains}
          selectedBusinessDomain={selectedBusinessDomain}
          onSetSelectedBusinessDomain={onSetSelectedBusinessDomain}
        />
      </Box>
    </>
  );
};

export default SearchHeader;
