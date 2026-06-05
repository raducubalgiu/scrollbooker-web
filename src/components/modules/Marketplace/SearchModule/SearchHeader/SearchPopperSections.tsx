import React, { memo } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  CircularProgress,
  Popper,
  Grow,
  Paper,
  Theme,
} from "@mui/material";

const POPPER_MODIFIERS = [{ name: "offset", options: { offset: [0, 12] } }];

const SectionLoader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      py: 4,
    }}
  >
    <CircularProgress size={20} />
  </Box>
);

const SearchLocationSection = dynamic(
  () => import("./sections/SearchLocationSection"),
  {
    loading: () => <SectionLoader />,
    ssr: false,
  }
);

const SearchDateTimeSection = dynamic(
  () => import("./sections/SearchDateTimeSection"),
  {
    loading: () => <SectionLoader />,
    ssr: false,
  }
);

import SearchServicesSection from "./sections/SearchServicesSection";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import {
  SearchHeaderActionsType,
  SearchHeaderStateType,
} from "./search-header-types";
import {
  SearchHeaderSectionEnum,
  SearchHeaderSectionType,
} from "../SearchHeaderSectionEnum";

type SearchPopperSectionsProps = {
  businessDomains: BusinessDomain[];
  state: SearchHeaderStateType;
  actions: SearchHeaderActionsType;
  isExpanded: boolean;
  pillRef: React.RefObject<HTMLDivElement | null>;
  popperRef: React.RefObject<HTMLDivElement | null>;
  activeSection: SearchHeaderSectionType | null;
  popperId?: string;
};

const SearchPopperSections = ({
  businessDomains,
  state,
  actions,
  isExpanded,
  pillRef,
  popperRef,
  activeSection,
  popperId,
}: SearchPopperSectionsProps) => {
  let sectionContent = null;

  switch (activeSection) {
    case SearchHeaderSectionEnum.Services:
      sectionContent = (
        <SearchServicesSection
          businessDomains={businessDomains}
          state={state}
          actions={actions}
        />
      );
      break;
    case SearchHeaderSectionEnum.Location:
      sectionContent = <SearchLocationSection />;
      break;
    case SearchHeaderSectionEnum.Datetime:
      sectionContent = (
        <SearchDateTimeSection
          state={state}
          onSetDateTime={actions.onSetDateTime}
        />
      );
      break;
    default:
      sectionContent = null;
  }

  return (
    <Popper
      open={isExpanded}
      anchorEl={pillRef.current}
      placement="bottom"
      transition
      modifiers={POPPER_MODIFIERS}
      sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 3 }}
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
            {sectionContent}
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default memo(SearchPopperSections);
