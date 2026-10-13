"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Dialog, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchServicesSection from "./SearchHeader/sections/SearchServicesSection";
import { SearchHeaderStateType } from "./SearchHeader/search-header-types";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";

type MobileSearchServicesSheetProps = {
  open: boolean;
  businessDomains: BusinessDomain[];
  headerState: SearchHeaderStateType;
  onClose: () => void;
  onSearch: (state: SearchHeaderStateType) => void;
};

const MobileSearchServicesSheet = ({
  open,
  businessDomains,
  headerState,
  onClose,
  onSearch,
}: MobileSearchServicesSheetProps) => {
  const [localState, setLocalState] =
    useState<SearchHeaderStateType>(headerState);

  useEffect(() => {
    if (open) setLocalState(headerState);
  }, [open, headerState]);

  const handleExecuteSearch = useCallback(
    (partialState: Partial<SearchHeaderStateType>) => {
      const nextState = { ...localState, ...partialState };
      setLocalState(nextState);
      onClose();
      onSearch(nextState);
    },
    [localState, onClose, onSearch]
  );

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      sx={{ display: { xs: "block", md: "none" } }}
    >
      <Stack direction="row" alignItems="center" sx={{ p: 1.5 }}>
        <IconButton onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      </Stack>

      <Stack sx={{ px: 2.5, pb: 4, flex: 1, overflowY: "auto" }}>
        <SearchServicesSection
          businessDomains={businessDomains}
          state={localState}
          actions={{
            onSetBusinessDomainId: (id) =>
              setLocalState((prev) => ({
                ...prev,
                selectedBusinessDomainId: id,
                selectedServiceDomainId: null,
                selectedServiceId: null,
                selectedSubFilterIds: [],
              })),
            onSetServiceDomainId: (id) =>
              setLocalState((prev) => ({
                ...prev,
                selectedServiceDomainId: id,
                selectedServiceId: null,
                selectedSubFilterIds: [],
              })),
            onSetServiceId: (id) =>
              setLocalState((prev) => ({
                ...prev,
                selectedServiceId: id,
                selectedSubFilterIds: [],
              })),
            onSetSubFilterIds: (ids) =>
              setLocalState((prev) => ({
                ...prev,
                selectedSubFilterIds: ids,
              })),
            onSetDateTime: (dateTime) =>
              setLocalState((prev) => ({ ...prev, ...dateTime })),
            onExecuteSearch: handleExecuteSearch,
          }}
        />
      </Stack>
    </Dialog>
  );
};

export default MobileSearchServicesSheet;
