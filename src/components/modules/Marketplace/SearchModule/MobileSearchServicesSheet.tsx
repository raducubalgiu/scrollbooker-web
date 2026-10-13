"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Theme } from "@mui/material";
import { useSession } from "next-auth/react";
import { SearchHeaderStateType } from "./SearchHeader/search-header-types";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { RecentSearch } from "@/ts/models/search/RecentSearch";
import { useGetRecentSearches } from "@/controllers/search/search.controller";
import { useGetServicesByServiceDomain } from "@/controllers/nomenclature/service.controller";
import { useGetFiltersByService } from "@/controllers/nomenclature/filter.controller";
import { getSelectedServicesLabel } from "./SearchHeader/getSelectedServicesLabel";
import { getDateTimeLabel } from "./SearchHeader/getDateTimeLabel";
import MobileMainFiltersStep from "./SearchHeader/mobile/MobileMainFiltersStep";
import MobileMainFiltersFooter from "./SearchHeader/mobile/MobileMainFiltersFooter";
import MobileServiceStep from "./SearchHeader/mobile/MobileServiceStep";
import MobileDateTimeStep from "./SearchHeader/mobile/MobileDateTimeStep";

type MobileSearchSheetStepType = "main" | "service" | "datetime";

const EMPTY_STATE: SearchHeaderStateType = {
  selectedBusinessDomainId: null,
  selectedServiceDomainId: null,
  selectedServiceId: null,
  selectedSubFilterIds: [],
  startDate: null,
  startTime: null,
  endTime: null,
};

const isStateEmpty = (state: SearchHeaderStateType) =>
  !state.selectedServiceDomainId &&
  !state.selectedServiceId &&
  state.selectedSubFilterIds.length === 0 &&
  !state.startDate &&
  !state.startTime &&
  !state.endTime;

const isStateEqual = (a: SearchHeaderStateType, b: SearchHeaderStateType) =>
  a.selectedBusinessDomainId === b.selectedBusinessDomainId &&
  a.selectedServiceDomainId === b.selectedServiceDomainId &&
  a.selectedServiceId === b.selectedServiceId &&
  a.selectedSubFilterIds.join(",") === b.selectedSubFilterIds.join(",") &&
  a.startDate === b.startDate &&
  a.startTime === b.startTime &&
  a.endTime === b.endTime;

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
  const [step, setStep] = useState<MobileSearchSheetStepType>("main");
  const [localState, setLocalState] =
    useState<SearchHeaderStateType>(headerState);

  useEffect(() => {
    if (open) {
      setLocalState(headerState);
      setStep("main");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const { status: sessionStatus } = useSession();

  const { data: recentSearches } = useGetRecentSearches({
    isEnabled: sessionStatus === "authenticated",
  });

  const { data: selectedDomainServices } = useGetServicesByServiceDomain({
    serviceDomainId: localState.selectedServiceDomainId,
  });

  const { data: selectedServiceFilters } = useGetFiltersByService({
    serviceId: String(localState.selectedServiceId),
    isEnabled: !!localState.selectedServiceId,
  });

  const serviceDomains = useMemo(
    () => businessDomains.flatMap((domain) => domain.service_domains),
    [businessDomains]
  );

  const selectedServiceDomainName = useMemo(
    () =>
      serviceDomains.find(
        (domain) => domain.id === localState.selectedServiceDomainId
      )?.name ?? "",
    [serviceDomains, localState.selectedServiceDomainId]
  );

  const serviceSummary = useMemo(
    () =>
      getSelectedServicesLabel({
        businessDomains,
        selectedServiceDomainId: localState.selectedServiceDomainId,
        selectedServiceId: localState.selectedServiceId,
        selectedSubFilterIds: localState.selectedSubFilterIds,
        services: selectedDomainServices,
        filters: selectedServiceFilters,
      }) ?? "Alege un serviciu",
    [
      businessDomains,
      localState.selectedServiceDomainId,
      localState.selectedServiceId,
      localState.selectedSubFilterIds,
      selectedDomainServices,
      selectedServiceFilters,
    ]
  );

  const dateTimeSummary =
    getDateTimeLabel({
      startDate: localState.startDate,
      startTime: localState.startTime,
      endTime: localState.endTime,
    }) ?? "Dată & Oră";

  const handleSelectServiceDomain = (serviceDomainId: number) => {
    setLocalState((prev) => ({
      ...prev,
      selectedServiceDomainId: serviceDomainId,
      selectedServiceId: null,
      selectedSubFilterIds: [],
    }));
    setStep("service");
  };

  const handleSelectRecentSearch = (search: RecentSearch) => {
    const nextState: SearchHeaderStateType = {
      ...localState,
      selectedServiceDomainId: search.service_domain.id,
      selectedServiceId: search.services[0]?.id ?? null,
      selectedSubFilterIds: [],
    };
    setLocalState(nextState);
    onSearch(nextState);
    onClose();
  };

  const handleClearService = () => {
    setLocalState((prev) => ({
      ...prev,
      selectedServiceDomainId: null,
      selectedServiceId: null,
      selectedSubFilterIds: [],
    }));
  };

  const handleClearDateTime = () => {
    setLocalState((prev) => ({
      ...prev,
      startDate: null,
      startTime: null,
      endTime: null,
    }));
  };

  const handleConfirmAll = () => {
    onSearch(localState);
    onClose();
  };

  const handleClearAll = () => {
    setLocalState(EMPTY_STATE);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{ display: { xs: "block", md: "none" } }}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      {step === "main" && (
        <>
          <MobileMainFiltersStep
            businessDomains={businessDomains}
            recentSearches={recentSearches ?? []}
            onSelectServiceDomain={handleSelectServiceDomain}
            onSelectRecentSearch={handleSelectRecentSearch}
            onClose={onClose}
          />

          <MobileMainFiltersFooter
            isClearEnabled={!isStateEmpty(localState)}
            isConfirmEnabled={!isStateEqual(localState, headerState)}
            onClear={handleClearAll}
            onConfirm={handleConfirmAll}
            serviceSummary={serviceSummary}
            isServiceActive={!!localState.selectedServiceDomainId}
            onOpenService={() => {
              if (localState.selectedServiceDomainId) setStep("service");
            }}
            onClearService={handleClearService}
            dateTimeSummary={dateTimeSummary}
            isDateTimeActive={!!localState.startDate}
            onOpenDateTime={() => setStep("datetime")}
            onClearDateTime={handleClearDateTime}
          />
        </>
      )}

      {step === "service" && localState.selectedServiceDomainId && (
        <MobileServiceStep
          selectedServiceDomainId={localState.selectedServiceDomainId}
          selectedServiceDomainName={selectedServiceDomainName}
          selectedServiceId={localState.selectedServiceId}
          selectedSubFilterIds={localState.selectedSubFilterIds}
          onBack={() => setStep("main")}
          onSelectServiceId={(serviceId) =>
            setLocalState((prev) => ({ ...prev, selectedServiceId: serviceId }))
          }
          onSelectSubFilterIds={(ids) =>
            setLocalState((prev) => ({ ...prev, selectedSubFilterIds: ids }))
          }
          onClear={() => {
            handleClearService();
            setStep("main");
          }}
        />
      )}

      {step === "datetime" && (
        <MobileDateTimeStep
          state={localState}
          onSetDateTime={(dateTime) =>
            setLocalState((prev) => ({ ...prev, ...dateTime }))
          }
          onClear={handleClearDateTime}
          onBack={() => setStep("main")}
        />
      )}
    </Drawer>
  );
};

export default MobileSearchServicesSheet;

const styles = {
  paper: {
    height: "92vh",
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
  },
};
