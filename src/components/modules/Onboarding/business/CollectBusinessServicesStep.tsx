import { Button, Stack } from "@mui/material";
import React, { useTransition } from "react";
import MyServicesSkeleton from "../../Admin/MyBusinessModule/MyServicesModule/MyServicesSkeleton";
import SelectedServicesList from "../../Admin/MyBusinessModule/MyServicesModule/SelectedServicesList";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import BusinessOnboardingSectionLayout from "../BusinessOnboardingSectionLayout";
import { useCollectBusinessServicesMutation } from "@/controllers/onboarding/onboarding.controller";
import { useTranslations } from "next-intl";
import { useSelectedServicesSelection } from "@/hooks/useSelectedServicesSelection";

const CollectBusinessServicesStep = () => {
  const t = useTranslations("onboarding.services");
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    serviceDomains,
    isLoading,
    selectedServices,
    toggleService,
    resetSelection,
    isDirty,
    hasSelection,
  } = useSelectedServicesSelection({
    businessId: String(session?.business_id),
  });

  const { mutate: handleSave, isPending: isLoadingUpdate } =
    useCollectBusinessServicesMutation();

  const isSaving = isPending || isLoadingUpdate;

  return (
    <BusinessOnboardingSectionLayout
      title={t("title")}
      description={t("subtitle")}
      isLoading={isSaving}
      isDisabled={isSaving || !hasSelection}
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

      {!isLoading && (
        <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1.5 }}>
          <Button
            size="small"
            disabled={isSaving || !isDirty}
            onClick={resetSelection}
          >
            {t("reset")}
          </Button>
        </Stack>
      )}

      <SelectedServicesList
        serviceDomains={serviceDomains}
        selectedServices={selectedServices}
        onToggleService={toggleService}
      />
    </BusinessOnboardingSectionLayout>
  );
};

export default CollectBusinessServicesStep;
