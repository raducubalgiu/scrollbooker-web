export function formatRating(
  value: number | string | null | undefined
): string {
  const numericValue =
    value == null ? NaN : typeof value === "string" ? Number(value) : value;

  if (Number.isNaN(numericValue)) {
    return "0,0";
  }

  const rounded = Math.round((numericValue + Number.EPSILON) * 10) / 10;

  return rounded.toLocaleString("ro-RO", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

const OPENING_HOURS_DAYS_MAP: Record<string, string> = {
  Monday: "Luni",
  Tuesday: "Marți",
  Wednesday: "Miercuri",
  Thursday: "Joi",
  Friday: "Vineri",
  Saturday: "Sâmbătă",
  Sunday: "Duminică",
};

type OpeningHoursLike = {
  open_now: boolean;
  closing_time: string | null;
  next_open_day: string | null;
  next_open_time: string | null;
};

export function formatOpeningStatus(
  openingHours: OpeningHoursLike | null | undefined
): string | null {
  if (!openingHours) return null;

  if (openingHours.open_now) {
    if (openingHours.closing_time) {
      return `Închide la ${openingHours.closing_time}`;
    }
    return "Deschis";
  }

  const nextDay = openingHours.next_open_day
    ? OPENING_HOURS_DAYS_MAP[openingHours.next_open_day] ??
      openingHours.next_open_day
    : null;
  const nextTime = openingHours.next_open_time;

  if (nextDay && nextTime) {
    return `Deschide ${nextDay.toLowerCase()} la ${nextTime}`;
  }

  return "Închis";
}

type LatLng = { lat: number; lng: number };

export function getDistanceKm(from: LatLng, to: LatLng): number {
  const EARTH_RADIUS_KM = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  const lat1 = toRad(from.lat);
  const lat2 = toRad(to.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

// Oglindește exact formatDistance.kt (Android) / aceleași praguri pe iOS —
// consistență cross-platform pentru cum afișăm distanța.
export function formatDistance(
  distanceKm: number | null | undefined
): string | null {
  if (distanceKm == null || Number.isNaN(distanceKm)) return null;

  if (distanceKm < 0.5) return "<500m";
  if (distanceKm < 1) return `${Math.trunc(distanceKm * 1000)}m`;
  if (distanceKm % 1 < 0.05) return `${Math.trunc(distanceKm)}km`;
  return `${distanceKm.toFixed(1)}km`;
}
