import { Box, Theme } from "@mui/material";
import { ScrollTabButton } from "../../components/ScrollTabButton";
import { BusinessProductsResponse } from "@/ts/models/booking/product/Product";
import { ScrollSyncResult } from "../../useScrollSync";

export const BookingTabs = ({
  sync,
  services,
}: {
  sync: ScrollSyncResult;
  services: BusinessProductsResponse[];
}) => (
  <Box
    sx={{
      position: "sticky",
      top: 90,
      zIndex: 10,
      bgcolor: "background.paper",
      mx: -2.5,
      px: 2.5,
      mb: 4,
      height: 90,
      display: "flex",
      alignItems: "center",
    }}
  >
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      {sync.canScrollLeft && (
        <ScrollTabButton
          direction="left"
          onClick={() =>
            sync.tabsContainerRef.current?.scrollBy({
              left: -220,
              behavior: "smooth",
            })
          }
        />
      )}
      <Box
        ref={sync.tabsContainerRef}
        onScroll={sync.checkTabsOverflow}
        sx={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
          position: "relative",
          alignItems: "center",
          gap: 1,
          py: 1,
        }}
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
              fontSize: 18,
              fontWeight: 600,
              color:
                sync.currentTab === index
                  ? "#fff"
                  : theme.palette.text.secondary,
              transition: "color 180ms ease",
            })}
          >
            {group.service.short_name}
          </Box>
        ))}
      </Box>
      {sync.canScrollRight && (
        <ScrollTabButton
          direction="right"
          onClick={() =>
            sync.tabsContainerRef.current?.scrollBy({
              left: 220,
              behavior: "smooth",
            })
          }
        />
      )}
    </Box>
  </Box>
);
