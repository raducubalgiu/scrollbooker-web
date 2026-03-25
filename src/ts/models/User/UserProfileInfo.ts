import { ScheduleType } from "../booking/schedule/ScheduleType";

export interface UserProfileInfo {
  description?: string | null;
  schedules: ScheduleType[];
  owner_fullname: string;
  location: LocationInfo;
}

export interface LocationInfo {
  address: string;
  formatted_address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  map_url: string;
}

export type UserProfileInfoResponse = UserProfileInfo;
