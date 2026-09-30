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
}
