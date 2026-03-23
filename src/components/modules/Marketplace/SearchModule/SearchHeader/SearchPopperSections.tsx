import { Grow, Paper, Popper, CircularProgress, Box } from "@mui/material";
import React, { useMemo, Suspense } from "react";
import {
  SearchHeaderSectionEnum,
  SearchHeaderSectionType,
} from "../SearchHeaderSectionEnum";

const SearchServicesSection = React.lazy(
  () => import("./SearchServicesSection")
);
const SearchLocationSection = React.lazy(
  () => import("./SearchLocationSection")
);
const SearchDateTimeSection = React.lazy(
  () => import("./SearchDateTimeSection")
);

type SearchPopperSectionsProps = {
  isExpanded: boolean;
  pillRef: React.RefObject<HTMLDivElement | null>;
  popperRef: React.RefObject<HTMLDivElement | null>;
  activeSection: SearchHeaderSectionType | null;
  popperId?: string;
};

const POPPER_MODIFIERS = [{ name: "offset", options: { offset: [0, 12] } }];

const SearchPopperSections = ({
  isExpanded,
  pillRef,
  popperRef,
  activeSection,
  popperId,
}: SearchPopperSectionsProps) => {
  const sections = useMemo(() => {
    switch (activeSection) {
      case SearchHeaderSectionEnum.Services:
        return (
          <Suspense
            fallback={
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress size={20} />
              </Box>
            }
          >
            <SearchServicesSection />
          </Suspense>
        );
      case SearchHeaderSectionEnum.Location:
        return (
          <Suspense
            fallback={
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress size={20} />
              </Box>
            }
          >
            <SearchLocationSection />
          </Suspense>
        );
      case SearchHeaderSectionEnum.Datetime:
        return (
          <Suspense
            fallback={
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress size={20} />
              </Box>
            }
          >
            <SearchDateTimeSection />
          </Suspense>
        );
      default:
        return null;
    }
  }, [activeSection]);

  return (
    <Popper
      open={isExpanded}
      anchorEl={pillRef.current}
      placement="bottom"
      transition
      modifiers={POPPER_MODIFIERS}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 3 }}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          timeout={260}
          style={{ transformOrigin: "top center" }}
        >
          <Paper
            id={popperId}
            ref={popperRef}
            elevation={8}
            sx={{
              borderRadius: 5,
              p: 3,
              minHeight: 160,
              minWidth: 600,
            }}
          >
            {sections}
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default React.memo(SearchPopperSections);
