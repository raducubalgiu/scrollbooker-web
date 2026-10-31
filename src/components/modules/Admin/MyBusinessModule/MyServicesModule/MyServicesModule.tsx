"use client";

import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import MainLayoutFooterActions from "@/components/cutomized/MainLayout/MainLayoutFooterActions";
import React, { useState } from "react";
import axios from "axios";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import { Session } from "next-auth";
import MyServicesSkeleton from "./MyServicesSkeleton";
import SelectedServicesList from "./SelectedServicesList";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useUpdateMySelectedServices } from "@/controllers/nomenclature/service.controller";
import { useSelectedServicesSelection } from "@/hooks/useSelectedServicesSelection";
import ServicesWithProductsModal from "./ServicesWithProductsModal";

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
    removedServiceIds,
  } = useSelectedServicesSelection({ businessId });

  const [blockedServiceIds, setBlockedServiceIds] = useState<number[] | null>(
    null
  );

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
        onError: (error) => {
          const detail = axios.isAxiosError(error)
            ? String(error.response?.data?.detail ?? "")
            : "";

          if (detail.includes("associated products")) {
            setBlockedServiceIds(removedServiceIds);
            return;
          }

          toast.error(t("saveError", { message: detail || error.message }));
        },
      }
    );
  };

  const footerActions: ActionButtonType[] = [
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
      footer={<MainLayoutFooterActions actions={footerActions} />}
    >
      {isLoading && <MyServicesSkeleton />}

      {!isLoading && (
        <SelectedServicesList
          serviceDomains={serviceDomains}
          selectedServices={selectedServices}
          onToggleService={toggleService}
        />
      )}

      {blockedServiceIds && (
        <ServicesWithProductsModal
          open
          businessId={Number(session.business_id)}
          removedServiceIds={blockedServiceIds}
          onClose={() => setBlockedServiceIds(null)}
        />
      )}
    </MainLayout>
  );
};
