"use client";

import { useEffect, useState } from "react";

export type UserLocationStatus =
  | "idle"
  | "loading"
  | "granted"
  | "denied"
  | "unsupported";

export type UserLocation = { lat: number; lng: number };

type UserLocationState = {
  status: UserLocationStatus;
  location: UserLocation | null;
};

let cachedState: UserLocationState = { status: "idle", location: null };
let inFlightRequest: Promise<UserLocationState> | null = null;
const listeners = new Set<(state: UserLocationState) => void>();

function notify(state: UserLocationState) {
  cachedState = state;
  listeners.forEach((listener) => listener(state));
}

// Cerem permisiunea o singură dată per sesiune de browser (cache în memorie,
// la nivel de modul) — oglindește comportamentul pasiv/non-blocant de pe
// mobil: niciun consumator nu trebuie să blocheze randarea cât timp
// location === null (permisiune neacordată, încă în curs, sau nesuportat).
function requestLocation(): Promise<UserLocationState> {
  if (inFlightRequest) return inFlightRequest;

  if (typeof navigator === "undefined" || !navigator.geolocation) {
    const state: UserLocationState = { status: "unsupported", location: null };
    notify(state);
    return Promise.resolve(state);
  }

  notify({ status: "loading", location: null });

  inFlightRequest = new Promise<UserLocationState>((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const state: UserLocationState = {
          status: "granted",
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        };
        notify(state);
        resolve(state);
      },
      () => {
        const state: UserLocationState = { status: "denied", location: null };
        notify(state);
        resolve(state);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 10 * 60 * 1000 }
    );
  });

  return inFlightRequest;
}

type UseUserLocationOptions = {
  // false pentru un consumator care vrea să declanșeze el însuși cererea
  // (ex. la click pe un buton), nu automat la montare — altfel prompt-ul
  // nativ al browserului ar apărea înainte ca userul să vadă vreun context,
  // fără nicio acțiune de-a lui care să-l explice. Implicit true, ca să nu
  // schimbe comportamentul pasiv existent (Feed: PostOverlay/SearchModule).
  autoRequest?: boolean;
};

export function useUserLocation(
  options: UseUserLocationOptions = {}
): UserLocationState & { requestLocation: () => Promise<UserLocationState> } {
  const { autoRequest = true } = options;
  const [state, setState] = useState<UserLocationState>(cachedState);

  useEffect(() => {
    listeners.add(setState);

    if (autoRequest && cachedState.status === "idle") {
      void requestLocation();
    } else {
      setState(cachedState);
    }

    return () => {
      listeners.delete(setState);
    };
  }, [autoRequest]);

  return { ...state, requestLocation };
}
