import { Paper } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { BusinessGalleryManager, GalleryItem } from "./BusinessGalleryManager";
import { toast } from "react-toastify";
import {
  GallerySlotInput,
  useUpdateBusinessGalleryMutation,
} from "@/controllers/booking/business.controller";
import { BusinessMediaFile } from "@/ts/models/booking/business/BusinessMediaFile";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import MainLayoutFooterActions from "@/components/cutomized/MainLayout/MainLayoutFooterActions";
import axios from "axios";

type BusinessGalleryTabProps = {
  businessId: number;
  mediaFiles?: BusinessMediaFile[];
  onFooterChange: (footer: React.ReactNode) => void;
};

export const BusinessGalleryTab = ({
  businessId,
  mediaFiles = [],
  onFooterChange,
}: BusinessGalleryTabProps) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isGalleryValid, setIsGalleryValid] = useState(false);

  const { mutate: handleUpload, isPending } =
    useUpdateBusinessGalleryMutation();

  const initialThumbnailUrls: string[] = mediaFiles
    .map((m) => m.thumbnail_url)
    .filter(
      (url): url is string => typeof url === "string" && url.trim() !== ""
    );

  const hasChanges = galleryItems.some((item, idx) => {
    if (item.file) return true;
    return item.src !== (initialThumbnailUrls[idx] ?? null);
  });

  const handleUpdate = () => {
    if (!isGalleryValid || !businessId || !hasChanges) return;

    const filledItems = galleryItems.filter((it) => it.src);

    if (filledItems.length === 0) {
      toast.error("Trebuie să ai cel puțin o imagine în galerie.");
      return;
    }

    const slots: GallerySlotInput[] = filledItems.map((it) =>
      it.file ? { type: "new" } : { type: "existing", url: it.src as string }
    );
    const newFiles = filledItems
      .filter((it) => it.file)
      .map((it) => it.file as File);

    handleUpload(
      { businessId, slots, newFiles, existingMediaFiles: mediaFiles },
      {
        onSuccess: () => {
          toast.success("Galeria a fost actualizată cu succes!");
        },
        onError: (err: Error) => {
          const detail = axios.isAxiosError(err)
            ? (err.response?.data as { detail?: string } | undefined)?.detail
            : undefined;
          toast.error(detail || "A apărut o eroare.");
        },
      }
    );
  };

  const footerActions: ActionButtonType[] = [
    {
      title: isPending ? "Se salvează..." : "Salvează Galeria",
      props: {
        onClick: handleUpdate,
        disabled: !isGalleryValid || !hasChanges || isPending,
      },
    },
  ];

  useLayoutEffect(() => {
    onFooterChange(<MainLayoutFooterActions actions={footerActions} />);
    return () => onFooterChange(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galleryItems, isGalleryValid, hasChanges, isPending]);

  return (
    <Paper
      sx={{
        p: { xs: 0, lg: 2.5 },
        bgcolor: { xs: "transparent" },
        borderRadius: { lg: 1 },
        boxShadow: { xs: 0, lg: "0 8px 24px rgba(0, 0, 0, 0.06)" },
      }}
    >
      <BusinessGalleryManager
        isMandatory={true}
        initialImages={initialThumbnailUrls}
        onChange={(items, isValid) => {
          setGalleryItems(items);
          setIsGalleryValid(isValid);
        }}
      />
    </Paper>
  );
};

export default BusinessGalleryTab;
