import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetMySelectedServices } from "@/controllers/nomenclature/service.controller";

type UseSelectedServicesSelectionParams = {
  businessId: string;
};

// Logica din spatele CollectBusinessServicesStep (onboarding) și
// MyServicesModule (admin) e identică — doar layout-ul și regulile de
// disabled diferă în funcție de context (vezi fiecare consumator).
export function useSelectedServicesSelection({
  businessId,
}: UseSelectedServicesSelectionParams) {
  const { data: serviceDomains, isLoading } = useGetMySelectedServices({
    businessId,
  });

  const defaultServiceIds = useMemo(
    () =>
      serviceDomains?.flatMap((domain) =>
        domain.services
          .filter((service) => service.is_selected)
          .map((service) => service.id)
      ) ?? [],
    [serviceDomains]
  );

  const [selectedServices, setSelectedServices] = useState<Set<number>>(
    () => new Set(defaultServiceIds)
  );

  useEffect(() => {
    setSelectedServices(new Set(defaultServiceIds));
  }, [defaultServiceIds]);

  const toggleService = useCallback((serviceId: number) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(serviceId)) {
        next.delete(serviceId);
      } else {
        next.add(serviceId);
      }
      return next;
    });
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedServices(new Set(defaultServiceIds));
  }, [defaultServiceIds]);

  const isDirty = useMemo(() => {
    if (selectedServices.size !== defaultServiceIds.length) return true;
    return defaultServiceIds.some((id) => !selectedServices.has(id));
  }, [selectedServices, defaultServiceIds]);

  return {
    serviceDomains,
    isLoading,
    selectedServices,
    toggleService,
    resetSelection,
    isDirty,
    hasSelection: selectedServices.size > 0,
  };
}
