import { get } from "@/utils/requests";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";

export async function getSchedulesByUserId(userId: number): Promise<Schedule[]> {
  const response = await get<Schedule[]>({ url: `/users/${userId}/schedules` });
  return response.data;
}
