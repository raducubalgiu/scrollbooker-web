import React from "react";
import { Box, Theme } from "@mui/material";
import { BusinessServicesWithProducts } from "@/ts/models/booking/product/Product";

type ProductsSelectionTabsProps = {
  services: BusinessServicesWithProducts[];
  currentTab: number;
  setCurrentTab: (index: number) => void;
  tabsContainerRef: React.RefObject<HTMLDivElement | null>;
  tabItemRefs: React.RefObject<(HTMLButtonElement | null)[]>;
  indicatorStyle: { x: number; width: number };
  isInitialMount: boolean;
};

const ProductsSelectionTabs = ({
  services,
  currentTab,
  setCurrentTab,
  tabsContainerRef,
  tabItemRefs,
  indicatorStyle,
  isInitialMount,
}: ProductsSelectionTabsProps) => {
  return (
    <Box ref={tabsContainerRef} sx={styles.tabsContainer}>
      <Box sx={styles.indicator(indicatorStyle, isInitialMount)} />

      {services.map((group, index) => (
        <Box
          key={group.service.id}
          component="button"
          ref={(node: HTMLButtonElement) => {
            if (tabItemRefs.current) {
              tabItemRefs.current[index] = node;
            }
          }}
          onClick={() => setCurrentTab(index)}
          sx={(theme: Theme) => styles.tabButton(theme, currentTab === index)}
        >
          {group.service.short_name}
        </Box>
      ))}
    </Box>
  );
};

export default ProductsSelectionTabs;

const styles = {
  tabsContainer: {
    display: "flex",
    overflowX: "auto",
    "&::-webkit-scrollbar": { display: "none" },
    position: "relative",
    gap: 1,
    py: 1,
  },
  indicator: (
    indicatorStyle: { x: number; width: number },
    isInitialMount: boolean
  ) => ({
    position: "absolute",
    top: "50%",
    left: 0,
    height: 40,
    width: indicatorStyle.width,
    bgcolor: "primary.main",
    borderRadius: 999,
    transform: `translateX(${indicatorStyle.x}px) translateY(-50%)`,
    zIndex: 0,
    transition: isInitialMount
      ? "none"
      : "transform 250ms cubic-bezier(0.4, 0, 0.2, 1), width 250ms",
    opacity: indicatorStyle.width > 0 ? 1 : 0,
  }),
  tabButton: (theme: Theme, isActive: boolean) => ({
    position: "relative",
    zIndex: 1,
    appearance: "none",
    border: 0,
    outline: 0,
    background: "transparent",
    px: 3,
    py: 1.2,
    borderRadius: 999,
    whiteSpace: "nowrap",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 600,
    color: isActive ? "#fff" : theme.palette.text.secondary,
    transition: "color 180ms ease",
  }),
} as const;
