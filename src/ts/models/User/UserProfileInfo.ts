import { ScheduleType } from "../booking/schedule/ScheduleType";

export type UserProfileInfoType = {
  description: string | undefined;
  schedules: ScheduleType[];
  owner_fullname: string;
  location: LocationInfoType;
};

export type LocationInfoType = {
  address: string;
  formatted_address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  map_url: string;
};

export type UserProfileInfoResponse = UserProfileInfoType;
