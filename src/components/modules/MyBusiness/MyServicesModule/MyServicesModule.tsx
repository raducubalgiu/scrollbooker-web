"use client";

import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import SelectedServiceItem from "./SelectedServiceItem";
import { toast } from "react-toastify";
import Accordion from "@/components/core/Accordion/Accordion";
import ActionButton, {
  ActionButtonType,
} from "@/components/core/ActionButton/ActionButton";
import { Stack } from "@mui/material";
import MyServicesSkeleton from "./MyServicesSkeleton";

export const MyServicesModule = () => {
  const {
    data,
    isLoading,
    refetch: refetchServiceDomains,
  } = useCustomQuery<SelectedServiceDomainWithServices[]>({
    key: "my-services",
    url: "/api/my-services",
  });

  const defaultServicesIds = useMemo(
    () =>
      data?.flatMap((serviceDomain) =>
        serviceDomain.services
          .filter((service) => service.is_selected)
          .map((service) => service.id)
      ) || [],
    [data]
  );

  const [selectedServices, setSelectedServices] = useState<Set<number>>(
    () => new Set(defaultServicesIds)
  );

  useEffect(() => {
    setSelectedServices(new Set(defaultServicesIds));
  }, [defaultServicesIds]);

  const defaultServicesSet = useMemo(
    () => new Set(defaultServicesIds),
    [defaultServicesIds]
  );

  const isSelectionUnchanged = useMemo(() => {
    if (selectedServices.size !== defaultServicesSet.size) return false;
    for (const id of selectedServices) {
      if (!defaultServicesSet.has(id)) return false;
    }
    return true;
  }, [selectedServices, defaultServicesSet]);

  const handleSetSelected = useCallback((serviceId: number) => {
    setSelectedServices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  }, []);

  const { mutate, isPending: isLoadingUpdate } = useMutate({
    key: "update-my-services",
    url: "/api/my-services",
    method: "PUT",
    options: {
      onSuccess: () => {
        refetchServiceDomains();
        toast.success("Serviciile au fost actualizate cu succes.");
      },
      onError: () => {
        refetchServiceDomains();
        toast.error("Ceva nu a mers cum trebuie. Încearcă mai târziu");
      },
    },
  });

  const isDisabled =
    isLoadingUpdate || selectedServices.size === 0 || isSelectionUnchanged;

  const actions: ActionButtonType[] = [
    {
      title: "Reset",
      props: {
        variant: "outlined",
        color: "secondary",
        disabled: isDisabled,
        onClick: () => {
          setSelectedServices(new Set(defaultServicesIds));
        },
      },
    },
    {
      title: "Salvează",
      props: {
        onClick: () => mutate(Array.from(selectedServices)),
        loading: isLoadingUpdate,
        disabled: isDisabled,
      },
    },
  ];

  return (
    <MainLayout title="Serviciile mele" hideAction>
      {isLoading && <MyServicesSkeleton />}
      {data?.map((serviceDomain) => (
        <Accordion
          title={serviceDomain.name}
          key={serviceDomain.id}
          sx={{ mb: 1 }}
        >
          {serviceDomain.services.map((service) => (
            <SelectedServiceItem
              key={service.id}
              service={service}
              isSelected={selectedServices.has(service.id)}
              onSetSelected={handleSetSelected}
            />
          ))}
        </Accordion>
      ))}

      <Stack alignItems="flex-end">
        <ActionButton actions={actions} sx={{ mt: 1.5 }} />
      </Stack>
    </MainLayout>
  );
};
