import { Box, Button } from "@mui/material";
import { useState } from "react";
import { BusinessGalleryManager, GalleryItem } from "./BusinessGalleryManager";
import { toast } from "react-toastify";
import { useUpdateBusinessGalleryMutation } from "@/controllers/booking/business.controller";
import { BusinessMediaFile } from "@/ts/models/booking/business/BusinessMediaFile";

type BusinessGalleryTabProps = {
  businessId: number;
  mediaFiles?: BusinessMediaFile[];
};

export const BusinessGalleryTab = ({
  businessId,
  mediaFiles = [],
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

  const handleUpdate = () => {
    if (!isGalleryValid || !businessId) return;

    const newFiles = galleryItems
      .filter((it) => it.file !== undefined)
      .map((it) => it.file as File);

    const keptServerUrls = galleryItems
      .filter((it) => it.src && !it.src.startsWith("blob:"))
      .map((it) => it.src as string);

    if (newFiles.length === 0 && keptServerUrls.length === 0) {
      toast.error("Trebuie să ai cel puțin o imagine în galerie.");
      return;
    }

    handleUpload(
      {
        businessId,
        photos: newFiles,
        existingThumbnailUrls: keptServerUrls,
      },
      {
        onSuccess: () => {
          toast.success("Galeria a fost actualizată cu succes!");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.detail || "A apărut o eroare.");
        },
      }
    );
  };

  return (
    <Box>
      <BusinessGalleryManager
        isMandatory={true}
        initialImages={initialThumbnailUrls}
        onChange={(items, isValid) => {
          setGalleryItems(items);
          setIsGalleryValid(isValid);
        }}
      />

      <Button
        variant="contained"
        onClick={handleUpdate}
        disabled={!isGalleryValid || isPending}
        disableElevation
        sx={{ mt: 3 }}
      >
        {isPending ? "Se salvează..." : "Salvează Galeria"}
      </Button>
    </Box>
  );
};

export default BusinessGalleryTab;
