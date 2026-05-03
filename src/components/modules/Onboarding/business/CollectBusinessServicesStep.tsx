import { useCustomQuery, useMutate } from "@/hooks/useHttp";
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
import { OnboardingResponse } from "@/ts/models/onboarding/Onboarding";
import BusinessOnboardingSectionLayout from "../BusinessOnboardingSectionLayout";

const CollectBusinessServicesStep = () => {
  const { update } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { data, isLoading } = useCustomQuery<
    SelectedServiceDomainWithServices[]
  >({
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

  const { mutate: handleSave, isPending: isLoadingUpdate } = useMutate({
    key: "collect-business-services",
    url: "/api/onboarding/collect-business-services",
    method: "PATCH",
    options: {
      onSuccess: async (data: OnboardingResponse) => {
        await update({
          is_validated: data.is_validated,
          registration_step: data.registration_step,
        });

        startTransition(() => {
          router.refresh();
        });
      },
    },
  });

  return (
    <BusinessOnboardingSectionLayout
      title="Categorii de servicii"
      description="Adauga serviciile pe care le desfasori la locatie"
      isLoading={isLoadingUpdate || isPending}
      isDisabled={isPending || isLoadingUpdate || selectedServices.size === 0}
      onClick={() => handleSave(Array.from(selectedServices))}
    >
      {isLoading && <MyServicesSkeleton />}
      <Paper>
        {data?.map((serviceDomain) => (
          <Accordion
            title={serviceDomain.name}
            key={serviceDomain.id}
            sx={{ mb: 1, boxShadow: "none" }}
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
      </Paper>
    </BusinessOnboardingSectionLayout>
  );
};

export default CollectBusinessServicesStep;
