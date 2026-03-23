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

  // Fetch business domains here (best-practice combined): server can pass initialData later
  const STALE_TIME = 24 * 60 * 60 * 1000; // 24h
  const { data: rawBusinessDomains } = useCustomQuery<
    BusinessDomainsResponse | any
  >({
    key: ["businessDomains"],
    url: "/api/nomenclatures/business-domains",
    options: {
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
    },
  });

  const businessDomains = React.useMemo<BusinessDomainsResponse>(() => {
    const d = rawBusinessDomains as any;
    if (!d) return [];
    if (Array.isArray(d)) return d;
    if (Array.isArray(d.results)) return d.results;
    if (Array.isArray(d.data)) return d.data;
    // eslint-disable-next-line no-console
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
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;

    if (!isExpanded)
      return () => {
        html.style.overflow = prevHtmlOverflow;
        body.style.overflow = prevBodyOverflow;
        body.style.paddingRight = prevBodyPaddingRight;
      };

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
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
              zIndex: (theme) => theme.zIndex.drawer + 1,
              bgcolor: "rgba(0,0,0,0.28)",
            }}
          />
        )}
      </Portal>
    ),
    [isExpanded, closeSection]
  );

  const containerSx = React.useMemo(() => {
    const bg = isExpanded
      ? "transparent"
      : theme.palette.mode === "dark"
        ? "background.default"
        : "background.paper";

    return {
      position: "sticky",
      top: 0,
      mt: `calc(-1 * ${mainPagePadding})`,
      zIndex: (theme: any) => theme.zIndex.drawer + 2,
      backgroundColor: bg,
      pt: (theme: any) => `calc(${mainPagePadding} + ${theme.spacing(1)})`,
      pb: 2.5,
    } as const;
  }, [isExpanded, mainPagePadding, theme.palette.mode]);

  const pillSx = React.useMemo(() => ({ position: "relative" }), []);

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
