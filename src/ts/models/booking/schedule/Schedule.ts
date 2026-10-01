export interface Schedule {
  id: number;
  user_id: number;
  business_id: number;
  day_week_index: number;
  day_of_week: string;
  start_time: string | null;
  end_time: string | null;
}

export interface ScheduleUpdate {
  id: number;
  start_time: string | null;
  end_time: string | null;
}
