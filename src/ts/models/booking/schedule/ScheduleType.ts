export type ScheduleType = {
  id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  user_id: number;
};

export type ScheduleUpdateType = {
  id: number;
  start_time: string | null;
  end_time: string | null;
};

export type ScheduleResponse = ScheduleType[];
