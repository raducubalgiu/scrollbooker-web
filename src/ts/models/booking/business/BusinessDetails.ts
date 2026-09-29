import { Schedule } from "../schedule/Schedule";
import { BusinessMediaFile } from "./BusinessMediaFile";
import { BusinessOwner } from "./BusinessOwner";
import { BusinessLocation } from "./BusinessProfile";

export interface BusinessDetails {
  id: number;
  owner: BusinessOwner;
  location: BusinessLocation;
  has_employees: boolean;
  media_files: BusinessMediaFile[];
  schedules: Schedule[];
}
