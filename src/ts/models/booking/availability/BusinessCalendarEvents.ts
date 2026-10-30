import { CalendarEventsInfo } from "./CalendarEvents";

export interface BusinessCalendarSchedule {
  day_of_week: string;
  start_time: string | null;
  end_time: string | null;
}

export interface BusinessCalendarEvent {
  id: number;
  start_date_locale: string;
  end_date_locale: string;
  start_date_utc: string;
  end_date_utc: string;
  is_blocked: boolean;
  info: CalendarEventsInfo;
}

export interface BusinessCalendarEmployee {
  id: number;
  fullname: string | null;
  username: string;
  avatar: string | null;
  profession: string;
  schedules: BusinessCalendarSchedule[];
  events: BusinessCalendarEvent[];
}

export interface BusinessCalendarEventsResponse {
  business_id: number;
  business_short_domain: string;
  timezone: string;
  employees: BusinessCalendarEmployee[];
}
