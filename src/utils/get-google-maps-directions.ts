import { BusinessCoordinates } from "@/ts/models/booking/business/Business";

export const getGoogleMapsDirectionsUrl = (
  coordinates: BusinessCoordinates | null | undefined
): string => {
  const { lat, lng } = coordinates || {};

  if (!lat || !lng) return "#";

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${lat},${lng}`)}`;
};
