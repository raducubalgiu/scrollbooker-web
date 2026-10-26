export interface DashboardBookingChannel {
  channel: string;
  bookings_no: number;
  revenue: number;
  percentage: number;
}

export interface DashboardBookingSource {
  source: string;
  bookings_no: number;
  revenue: number;
  percentage: number;
}

export interface DashboardContactClickSource {
  source: string;
  count: number;
  percentage: number;
}

export interface DashboardBooking {
  bookings_no: number;
  finished_bookings_no: number;
  cancelled_bookings_no: number;
  revenue: number;
  revenue_without_cancelled: number;
  revenue_from_video: number;
  revenue_scroll_booker: number;
  channels: DashboardBookingChannel[];
  sources: DashboardBookingSource[];
  business_short_domain: string | null;
  instant_booking: boolean;
  profile_visits_count: number;
  unique_profile_visitors_count: number;
  whatsapp_clicks_count: number;
  call_clicks_count: number;
  contact_click_sources: DashboardContactClickSource[];
}
