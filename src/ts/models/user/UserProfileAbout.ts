import { BusinessMediaFile } from "../booking/business/BusinessMediaFile";
import { BusinessLocation } from "../booking/business/BusinessProfile";
import { Schedule } from "../booking/schedule/Schedule";

export interface UserProfileAbout {
  description: string | null;
  schedules: Schedule[];
  owner: UserProfileAboutOwner;
  location: BusinessLocation | null;
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
