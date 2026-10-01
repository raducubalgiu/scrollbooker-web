export interface CalendarEventsCustomer {
  id: number | null;
  fullname: string;
  username: string | null;
  avatar: string | null;
}

export interface PaymentCurrency {
  id: number;
  name: string;
}

export type CalendarEventSourceProvider = "internal" | "google_calendar";

export interface CalendarEventsProduct {
  product_name: string;
  product_full_price: number;
  product_price_with_discount: number;
  product_discount: number;
}

export interface CalendarEventsGroupedAppointment {
  id: number;
  start_date: string;
  end_date: string;
  channel: string;
  is_blocked: boolean;
  blocked_message: string | null;
  customer: CalendarEventsCustomer;
  total_price: number;
  total_price_with_discount: number;
  total_discount: number;
  total_duration: number;
  payment_currency: PaymentCurrency;
  products: CalendarEventsProduct[];
  source_provider: CalendarEventSourceProvider;
  is_external: boolean;
  is_editable: boolean;
  external_event_id: string | null;
}

export interface CalendarEventsInfo {
  channel: string;
  customer: CalendarEventsCustomer | null;
  blocked_message: string | null;
  total_price: number;
  total_price_with_discount: number;
  total_discount: number;
  total_duration: number;
  payment_currency: PaymentCurrency;
  products: CalendarEventsProduct[];
  source_provider: CalendarEventSourceProvider;
  is_external: boolean;
  is_editable: boolean;
  external_event_id: string | null;
}

export interface CalendarEventsSlot {
  id: number | null;
  start_date_locale: string;
  end_date_locale: string;
  start_date_utc: string;
  end_date_utc: string;
  is_booked: boolean;
  is_blocked: boolean;
  is_last_minute: boolean;
  last_minute_discount: number | null;
  info: CalendarEventsInfo | null;
}

export interface CalendarEventsDay {
  day: string;
  is_booked: boolean;
  is_closed: boolean;
  slots: CalendarEventsSlot[];
}

export interface CalendarEventsResponse {
  business_short_domain: string;
  days: CalendarEventsDay[];
}

export interface CalendarEventsBusinessEmployee {
  id: number;
  fullname: string;
  username: string;
  avatar: string | null;
  profession: string;
  slots: CalendarEventsSlot[];
}

export interface CalendarEventsBusinessResponse {
  business_short_domain: string;
  employees: CalendarEventsBusinessEmployee[];
}

export interface EmployeeAvailabilityResponse {
  employee_id: number;
  has_availability: boolean;
}
