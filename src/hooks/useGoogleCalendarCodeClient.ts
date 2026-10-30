"use client";

import { useCallback, useEffect, useState } from "react";

const GIS_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
const GOOGLE_CALENDAR_SCOPES = [
  "openid",
  "email",
  "https://www.googleapis.com/auth/calendar.events",
].join(" ");
const GOOGLE_CALENDAR_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_CLIENT_ID;

type CodeResponse = { code?: string; error?: string; error_description?: string };

type CodeClient = { requestCode: () => void };

type GoogleOAuth2 = {
  initCodeClient: (config: {
    client_id: string;
    scope: string;
    ux_mode: "popup";
    callback: (response: CodeResponse) => void;
    error_callback?: (error: { type: string; message?: string }) => void;
  }) => CodeClient;
};

declare global {
  interface Window {
    google?: { accounts?: { oauth2?: GoogleOAuth2 } };
  }
}

let scriptPromise: Promise<void> | null = null;

const loadGoogleIdentityScript = () => {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = GIS_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Google Identity Services could not be loaded"));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
};

export class GoogleCalendarAuthCancelledError extends Error {}

export const useGoogleCalendarCodeClient = () => {
  const [isReady, setIsReady] = useState(false);
  const isConfigured = !!GOOGLE_CALENDAR_CLIENT_ID;

  useEffect(() => {
    if (!isConfigured) return;
    loadGoogleIdentityScript()
      .then(() => setIsReady(true))
      .catch(() => setIsReady(false));
  }, [isConfigured]);

  const requestServerAuthCode = useCallback(async (): Promise<string> => {
    if (!GOOGLE_CALENDAR_CLIENT_ID) {
      throw new Error("NEXT_PUBLIC_GOOGLE_CALENDAR_CLIENT_ID is not configured");
    }

    await loadGoogleIdentityScript();
    const oauth2 = window.google?.accounts?.oauth2;
    if (!oauth2) throw new Error("Google Identity Services is unavailable");

    return new Promise<string>((resolve, reject) => {
      const client = oauth2.initCodeClient({
        client_id: GOOGLE_CALENDAR_CLIENT_ID,
        scope: GOOGLE_CALENDAR_SCOPES,
        ux_mode: "popup",
        callback: (response) => {
          if (response.code) resolve(response.code);
          else reject(new Error(response.error_description ?? response.error ?? "No code returned"));
        },
        error_callback: (error) => {
          if (error.type === "popup_closed") reject(new GoogleCalendarAuthCancelledError());
          else reject(new Error(error.message ?? error.type));
        },
      });
      client.requestCode();
    });
  }, []);

  return { isReady, isConfigured, requestServerAuthCode };
};
