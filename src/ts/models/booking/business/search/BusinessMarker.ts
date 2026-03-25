import { BusinessCoordinatesType } from "../BusinessResponse";
import { BusinessMediaFileType } from "../BusinessMediaFile";
import { BusinessOwner } from "../BusinessOwner";

export interface BusinessMarker {
  id: number;
  owner: BusinessOwner;
  business_type: string;
  business_short_domain: string;
  address: string;
  coordinates: BusinessCoordinatesType;
  is_primary: boolean;
  has_video: boolean;
  media_files: BusinessMediaFileType[];
}

export type BusinessMarkerResponse = BusinessMarker[];
