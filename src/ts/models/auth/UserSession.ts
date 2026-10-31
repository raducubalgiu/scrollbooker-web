export type UserSessionPlatform = "ios" | "android" | "web" | "unknown";

export type UserSession = {
  id: string;
  platform: UserSessionPlatform;
  device_name: string | null;
  app_version: string | null;
  ip_address: string | null;
  created_at: string;
  last_used_at: string;
  expires_at: string;
  is_current: boolean;
};
