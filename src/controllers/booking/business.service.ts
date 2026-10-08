"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { get } from "@/utils/requests";
import { BusinessDetails } from "@/ts/models/booking/business/BusinessDetails";

const BASE_URL = process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT;

export type GallerySlotInput = { type: "existing"; url: string } | { type: "new" };

type UpdateBusinessGalleryServiceParams = {
  businessId: string | number;
  slots: GallerySlotInput[];
  newFiles: File[];
};

const fetchExistingImageAsFile = async (
  url: string,
  filename: string
): Promise<File> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Nu am putut prelua o imagine existentă din galerie.");
  }

  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type || "image/jpeg" });
};

export const updateBusinessGallery = async ({
  businessId,
  slots,
  newFiles,
}: UpdateBusinessGalleryServiceParams): Promise<void> => {
  if (slots.length === 0) {
    throw new Error("Trebuie să ai cel puțin o imagine în galerie.");
  }

  const { data: businessDetails } = await get<BusinessDetails>({
    url: "/businesses/my-business-details",
  });

  const allowedUrls = new Set(
    (businessDetails.media_files ?? []).flatMap((m) =>
      [m.url, m.thumbnail_url].filter((value): value is string => !!value)
    )
  );

  let nextNewFileIndex = 0;

  const orderedPhotos = await Promise.all(
    slots.map(async (slot, index) => {
      if (slot.type === "new") {
        const file = newFiles[nextNewFileIndex];
        nextNewFileIndex += 1;

        if (!file) {
          throw new Error("Lipsește o imagine încărcată.");
        }

        return file;
      }

      if (!allowedUrls.has(slot.url)) {
        throw new Error("Imagine din galerie invalidă.");
      }

      return fetchExistingImageAsFile(slot.url, `existing_${index}.jpg`);
    })
  );

  const formData = new FormData();
  orderedPhotos.forEach((photo) => formData.append("photos", photo));

  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    throw new Error("Neautorizat.");
  }

  const response = await fetch(
    `${BASE_URL}/businesses/${businessId}/gallery`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${session.accessToken}` },
      body: formData,
    }
  );

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(
      payload?.detail || "A apărut o eroare la actualizarea galeriei."
    );
  }
};
