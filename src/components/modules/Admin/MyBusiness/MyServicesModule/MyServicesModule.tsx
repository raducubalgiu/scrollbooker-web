"use client";

import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import SelectedServiceItem from "./SelectedServiceItem";
import Accordion from "@/components/core/Accordion/Accordion";
import ActionButton, {
  ActionButtonType,
} from "@/components/core/ActionButton/ActionButton";
import { Stack } from "@mui/material";
import { Session } from "next-auth";
import MyServicesSkeleton from "./MyServicesSkeleton";
import { toast } from "react-toastify";
import {
  useGetMySelectedServices,
  useUpdateMySelectedServices,
} from "@/controllers/nomenclature/service.controller";

type MyServicesModule = {
  session: Session;
};

export const MyServicesModule = ({ session }: MyServicesModule) => {
  const { data, isLoading } = useGetMySelectedServices({
    businessId: String(session.user_id),
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

  const { mutate, isPending: isLoadingUpdate } = useUpdateMySelectedServices();

  const handleUpdate = () => {
    const payload = {
      businessId: String(session.user_id),
      data: {
        service_ids: Array.from(selectedServices),
      },
    };

    mutate(
      {
        businessId: payload.businessId,
        data: payload.data,
      },
      {
        onSuccess: () => {
          toast.success("Serviciile au fost salvate cu succes!");
        },
        onError: (err) => {
          toast.error(`A apărut o eroare: ${err.message}`);
        },
      }
    );
  };

  const actions: ActionButtonType[] = [
    {
      title: "Reset",
      props: {
        variant: "outlined",
        color: "secondary",
        onClick: () => setSelectedServices(new Set(defaultServicesIds)),
      },
    },
    {
      title: "Salvează",
      props: {
        onClick: () => handleUpdate(),
        loading: isLoadingUpdate,
      },
    },
  ];

  return (
    <MainLayout title="Categorii de servicii" showHeader={true} hideAction>
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
