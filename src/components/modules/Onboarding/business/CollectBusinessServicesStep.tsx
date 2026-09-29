import { useCustomQuery } from "@/hooks/useHttp";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";
import { Paper } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import MyServicesSkeleton from "../../Admin/MyBusiness/MyServicesModule/MyServicesSkeleton";
import SelectedServiceItem from "../../Admin/MyBusiness/MyServicesModule/SelectedServiceItem";
import Accordion from "@/components/core/Accordion/Accordion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import BusinessOnboardingSectionLayout from "../BusinessOnboardingSectionLayout";
import { useCollectBusinessServicesMutation } from "@/controllers/onboarding/onboarding.controller";
import { useTranslations } from "next-intl";

const CollectBusinessServicesStep = () => {
  const t = useTranslations("onboarding.services");
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { data, isLoading } = useCustomQuery<
    SelectedServiceDomainWithServices[]
  >({
    key: ["my-services", session?.business_id ?? undefined],
    url: `/api/businesses/${session?.business_id}/services`,
    options: {
      enabled: !!session?.business_id,
    },
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

  const { mutate: handleSave, isPending: isLoadingUpdate } =
    useCollectBusinessServicesMutation();

  return (
    <BusinessOnboardingSectionLayout
      title={t("title")}
      description={t("subtitle")}
      isLoading={isLoadingUpdate || isPending}
      isDisabled={isPending || isLoadingUpdate || selectedServices.size === 0}
      onClick={() =>
        handleSave(Array.from(selectedServices), {
          onSuccess: async (data) => {
            await update({
              is_validated: data.is_validated,
              registration_step: data.registration_step,
            });

            startTransition(() => {
              router.refresh();
            });
          },
        })
      }
    >
      {isLoading && <MyServicesSkeleton />}
      <Paper>
        {data?.map((serviceDomain) => (
          <Accordion
            title={serviceDomain.name}
            key={serviceDomain.id}
            sx={{ mb: 1, boxShadow: "none" }}
          >
            {serviceDomain?.services?.map((service) => (
              <SelectedServiceItem
                key={service.id}
                service={service}
                isSelected={selectedServices.has(service.id)}
                onSetSelected={handleSetSelected}
              />
            ))}
          </Accordion>
        ))}
      </Paper>
    </BusinessOnboardingSectionLayout>
  );
};

export default CollectBusinessServicesStep;
