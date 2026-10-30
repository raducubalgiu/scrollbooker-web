import React from "react";
import { Box, Theme } from "@mui/material";
import { ScrollSyncResult } from "@/components/modules/Marketplace/BookingModule/useScrollSync";
import { BusinessServicesWithProducts } from "@/ts/models/booking/product/Product";

const TABS_HEIGHT = 64;

type ProductsPickerTabsProps = {
  services: BusinessServicesWithProducts[];
  sync: ScrollSyncResult;
};

const ProductsPickerTabs = ({ services, sync }: ProductsPickerTabsProps) => {
  return (
    <Box sx={styles.container}>
      <Box
        ref={sync.tabsContainerRef}
        onScroll={sync.checkTabsOverflow}
        sx={styles.scrollArea}
      >
        <Box
          sx={{
            position: "absolute",
            top: sync.indicatorStyle.y,
            left: 0,
            height: sync.indicatorStyle.height,
            width: sync.indicatorStyle.width,
            bgcolor: "primary.main",
            borderRadius: 999,
            transform: `translateX(${sync.indicatorStyle.x}px)`,
            transition:
              "transform 250ms cubic-bezier(0.4, 0, 0.2, 1), width 250ms",
            opacity: sync.indicatorStyle.ready ? 1 : 0,
            zIndex: 0,
          }}
        />

        {services.map((group, index) => (
          <Box
            key={group.service.id}
            component="button"
            ref={(node: HTMLButtonElement) => {
              sync.tabItemRefs.current[index] = node;
            }}
            onClick={() => sync.scrollToSection(index)}
            sx={(theme: Theme) =>
              styles.tabButton(theme, sync.currentTab === index)
            }
          >
            {group.service.short_name}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductsPickerTabs;

const styles = {
  container: {
    position: "relative" as const,
    height: TABS_HEIGHT,
    bgcolor: "background.default",
    display: "flex",
    alignItems: "center",
  },
  scrollArea: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    gap: 1,
    width: "100%",
    overflowX: "auto" as const,
    "&::-webkit-scrollbar": { display: "none" },
    scrollbarWidth: "none" as const,
    WebkitOverflowScrolling: "touch" as const,
  },
  tabButton: (theme: Theme, isActive: boolean) => ({
    position: "relative" as const,
    zIndex: 1,
    appearance: "none" as const,
    border: 0,
    outline: 0,
    background: "transparent",
    px: { xs: 2, md: 2.5 },
    py: { xs: 1.5, md: 1.75 },
    borderRadius: 999,
    whiteSpace: "nowrap" as const,
    cursor: "pointer",
    flexShrink: 0,
    fontSize: 15,
    fontWeight: 600,
    color: isActive ? theme.palette.common.white : theme.palette.text.secondary,
    transition: "color 180ms ease",
  }),
};
