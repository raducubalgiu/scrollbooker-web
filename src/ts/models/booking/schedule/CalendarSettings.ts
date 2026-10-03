export interface UserCalendarSettings {
  user_id: number;
  slot_duration_minutes: number;
  appointment_gap_minutes: number;
}

export interface SlotDurationUpdate {
  slot_duration_minutes: number;
}

export interface AppointmentGapUpdate {
  appointment_gap_minutes: number;
}
