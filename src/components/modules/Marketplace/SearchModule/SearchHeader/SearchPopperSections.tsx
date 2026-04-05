import { Grow, Paper, Popper, CircularProgress, Box } from "@mui/material";
import React, { useMemo, Suspense } from "react";
import {
  SearchHeaderSectionEnum,
  SearchHeaderSectionType,
} from "../SearchHeaderSectionEnum";
import SearchServicesSection from "./sections/SearchServicesSection";
import {
  SearchHeaderActionsType,
  SearchHeaderStateType,
} from "./search-header-types";

const SearchLocationSection = React.lazy(
  () => import("./sections/SearchLocationSection")
);
const SearchDateTimeSection = React.lazy(
  () => import("./sections/SearchDateTimeSection")
);

type SearchPopperSectionsProps = {
  state: SearchHeaderStateType;
  actions: SearchHeaderActionsType;
  isExpanded: boolean;
  pillRef: React.RefObject<HTMLDivElement | null>;
  popperRef: React.RefObject<HTMLDivElement | null>;
  activeSection: SearchHeaderSectionType | null;
  popperId?: string;
};

const POPPER_MODIFIERS = [{ name: "offset", options: { offset: [0, 12] } }];

const SearchPopperSections = ({
  state,
  actions,
  isExpanded,
  pillRef,
  popperRef,
  activeSection,
  popperId,
}: SearchPopperSectionsProps) => {
  const {
    selectedBusinessDomainId,
    selectedServiceDomainId,
    selectedServiceId,
  } = state;
  const { onSetBusinessDomainId, onSetServiceDomainId, onSetServiceId } =
    actions;

  const sections = useMemo(() => {
    switch (activeSection) {
      case SearchHeaderSectionEnum.Services:
        return (
          <SearchServicesSection
            state={{
              selectedBusinessDomainId,
              selectedServiceDomainId,
              selectedServiceId,
            }}
            actions={{
              onSetBusinessDomainId,
              onSetServiceDomainId,
              onSetServiceId,
            }}
          />
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
  }, [
    activeSection,
    selectedBusinessDomainId,
    selectedServiceDomainId,
    selectedServiceId,
  ]);

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
