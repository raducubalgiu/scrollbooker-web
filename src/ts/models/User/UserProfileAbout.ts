import { BusinessMediaFile } from "../booking/business/BusinessMediaFile";
import { Schedule } from "../booking/schedule/Schedule";

export interface UserProfileAbout {
  description: string | null;
  schedules: Schedule[];
  owner: UserProfileAboutOwner;
  location: LocationInfo;
  business_media: BusinessMediaFile[];
}

export interface UserProfileAboutOwner {
  id: number;
  fullname: string;
  username: string;
  profession: string;
  avatar: string | null;
  ratings_average: number;
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
