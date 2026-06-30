import { Box, Theme } from "@mui/material";
import { ScrollTabButton } from "../../components/ScrollTabButton";
import { ScrollSyncResult } from "../../useScrollSync";
import { UserProducts } from "@/ts/models/booking/product/Product";

export const BookingTabs = ({
  sync,
  products,
  top,
}: {
  sync: ScrollSyncResult;
  products: UserProducts;
  top?: number;
}) => (
  <Box
    sx={{
      position: "sticky",
      top,
      zIndex: 10,
      bgcolor: "background.default",
      mb: 4,
      height: top,
      display: "flex",
      alignItems: "center",
      width: { xs: "100vw", md: "100%" },
      maxWidth: { xs: "100vw", md: "100%" },
      overflow: "hidden",
      borderBottom: 1,
      borderColor: "divider",
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
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <ScrollTabButton
            direction="left"
            onClick={() =>
              sync.tabsContainerRef.current?.scrollBy({
                left: -220,
                behavior: "smooth",
              })
            }
          />
        </Box>
      )}

      <Box
        ref={sync.tabsContainerRef}
        onScroll={sync.checkTabsOverflow}
        sx={{
          display: "flex",
          overflowX: "scroll",
          overflowY: "hidden",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          position: "relative",
          alignItems: "center",
          gap: 1,
          py: 1,
          width: "100%",
          minWidth: 0,
          flexShrink: 0,
          WebkitOverflowScrolling: "touch",
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
        {products.data.map((group, index) => (
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
              px: { xs: 2.5, md: 3.5 },
              py: { xs: 1.5, md: 2 },
              borderRadius: 999,
              whiteSpace: "nowrap",
              cursor: "pointer",
              flexShrink: 0,
              fontSize: { xs: 14, md: 18 },
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
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <ScrollTabButton
            direction="right"
            onClick={() =>
              sync.tabsContainerRef.current?.scrollBy({
                left: 220,
                behavior: "smooth",
              })
            }
          />
        </Box>
      )}
    </Box>
  </Box>
);
