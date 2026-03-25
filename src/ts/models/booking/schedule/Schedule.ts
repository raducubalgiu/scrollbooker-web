export interface Schedule {
  id: number;
  day_of_week: string;
  start_time?: string | null;
  end_time?: string | null;
  user_id: number;
}

export interface ScheduleUpdate {
  id: number;
  start_time?: string | null;
  end_time?: string | null;
}
