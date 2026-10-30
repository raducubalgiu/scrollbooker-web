export type CalendarConnectionStatus = "active" | "revoked" | "error";

export interface CalendarConnection {
  id: number;
  user_id: number;
  business_id: number;
  provider: "google_calendar";
  status: CalendarConnectionStatus;
  google_account_email: string | null;
  token_expires_at: string | null;
  scope: string | null;
  last_synced_at: string | null;
  has_sync_conflicts: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface GoogleCalendarConnectRequest {
  server_auth_code: string;
  platform: "web";
}
