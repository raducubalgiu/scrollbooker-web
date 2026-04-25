export interface AvailableTimeSlot {
  start_date_utc: string;
  end_date_utc: string;
  start_date_locale: string;
  end_date_locale: string;
  is_last_minute: boolean;
  last_minute_discount: number | null;
}

export interface AvailableTimeslotsResponse {
  is_closed: boolean;
  available_slots: AvailableTimeSlot[];
}
