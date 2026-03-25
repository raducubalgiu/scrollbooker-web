import { Schedule } from "../booking/schedule/Schedule";

export interface UserProfileInfo {
  description?: string | null;
  schedules: Schedule[];
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
