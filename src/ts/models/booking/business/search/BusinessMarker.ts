import { BusinessCoordinates } from "../Business";
import { BusinessMediaFile } from "../BusinessMediaFile";
import { BusinessOwner } from "../BusinessOwner";

export interface BusinessMarker {
  id: number;
  owner: BusinessOwner;
  business_type: string;
  business_short_domain: string;
  address: string;
  coordinates: BusinessCoordinates;
  is_primary: boolean;
  has_video: boolean;
  media_files: BusinessMediaFile[];
}
