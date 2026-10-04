"use client";

import BusinessOnboardingSectionLayout from "../BusinessOnboardingSectionLayout";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCollectBusinessGalleryMutation } from "@/controllers/onboarding/onboarding.controller";
import { useTranslations } from "next-intl";
import { BusinessGalleryManager } from "../../Admin/MyBusinessModule/MyBusinessDetailsModule/BusinessGalleryManager";
import { useState } from "react";
import { toast } from "react-toastify";

type GalleryItem = {
  id: string;
  src: string | null;
  file?: File;
};

const CollectBusinessGalleryStep = () => {
  const t = useTranslations("onboarding.gallery");
  const router = useRouter();
  const { update } = useSession();

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const { mutate: handleUpload, isPending } =
    useCollectBusinessGalleryMutation();

  const onSave = () => {
    const filesToUpload = galleryItems
      .filter((it) => it.file)
      .map((it) => it.file as File);

    handleUpload(filesToUpload, {
      onSuccess: async (data) => {
        if (filesToUpload.length > 0) toast.success(t("success"));
        await update({
          is_validated: data.is_validated,
          registration_step: data.registration_step,
        });
        router.refresh();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.detail || t("errorFallback"));
      },
    });
  };

  return (
    <BusinessOnboardingSectionLayout
      title={t("title")}
      description={t("subtitle")}
      isLoading={isPending}
      isDisabled={isPending}
      onClick={onSave}
    >
      <BusinessGalleryManager
        isMandatory={false}
        onChange={(items) => setGalleryItems(items)}
      />
    </BusinessOnboardingSectionLayout>
  );
};

export default CollectBusinessGalleryStep;
