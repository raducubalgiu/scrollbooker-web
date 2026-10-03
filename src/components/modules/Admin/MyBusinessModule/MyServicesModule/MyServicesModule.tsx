"use client";

import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import React from "react";
import ActionButton, {
  ActionButtonType,
} from "@/components/core/ActionButton/ActionButton";
import { Stack } from "@mui/material";
import { Session } from "next-auth";
import MyServicesSkeleton from "./MyServicesSkeleton";
import SelectedServicesList from "./SelectedServicesList";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useUpdateMySelectedServices } from "@/controllers/nomenclature/service.controller";
import { useSelectedServicesSelection } from "@/hooks/useSelectedServicesSelection";

type MyServicesModule = {
  session: Session;
};

export const MyServicesModule = ({ session }: MyServicesModule) => {
  const t = useTranslations("myServices");
  const businessId = String(session.business_id);

  const {
    serviceDomains,
    isLoading,
    selectedServices,
    toggleService,
    resetSelection,
    isDirty,
  } = useSelectedServicesSelection({ businessId });

  const { mutate, isPending: isLoadingUpdate } = useUpdateMySelectedServices();

  const handleUpdate = () => {
    mutate(
      {
        businessId,
        data: { service_ids: Array.from(selectedServices) },
      },
      {
        onSuccess: () => {
          toast.success(t("saveSuccess"));
        },
        onError: (err) => {
          toast.error(t("saveError", { message: err.message }));
        },
      }
    );
  };

  const actions: ActionButtonType[] = [
    {
      title: t("reset"),
      props: {
        variant: "outlined",
        color: "secondary",
        disabled: isLoadingUpdate || !isDirty,
        onClick: resetSelection,
      },
    },
    {
      title: t("save"),
      props: {
        onClick: handleUpdate,
        loading: isLoadingUpdate,
        disabled: isLoadingUpdate || !isDirty,
      },
    },
  ];

  return (
    <MainLayout
      title={t("title")}
      showHeader={true}
      hideAction
      sx={{ bgcolor: "background.paper" }}
    >
      {isLoading && <MyServicesSkeleton />}

      {!isLoading && (
        <SelectedServicesList
          serviceDomains={serviceDomains}
          selectedServices={selectedServices}
          onToggleService={toggleService}
        />
      )}

      <Stack alignItems="flex-end">
        <ActionButton actions={actions} sx={{ mt: 1.5 }} />
      </Stack>
    </MainLayout>
  );
};
