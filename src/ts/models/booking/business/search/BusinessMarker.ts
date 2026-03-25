import { BusinessOwnerType } from "../BusinessOwnerType";
import { BusinessCoordinatesType } from "../BusinessResponse";
import { BusinessMediaFileType } from "../BusinessMediaFile";

export type BusinessMarkerType = {
  id: number;
  owner: BusinessOwnerType;
  business_type: string;
  business_short_domain: string;
  address: string;
  coordinates: BusinessCoordinatesType;
  is_primary: boolean;
  has_video: boolean;
  media_files: BusinessMediaFileType[];
};

export type BusinessMarkerResponse = BusinessMarkerType[];
